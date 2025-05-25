import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { keccak256, toBytes } from "viem";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ShieldCheck, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { USER_PROOF_HUB } from "@/constants";

const identitySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  documentNumber: z
    .string()
    .min(5, "Document number must be at least 5 characters"),
  additionalInfo: z.string().optional(),
});

type IdentityFormData = z.infer<typeof identitySchema>;

// Contract ABI for the verify function
const CONTRACT_ABI = [
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "proofHash", type: "bytes32" },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export function IdentityVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [computedHash, setComputedHash] = useState<string>("");
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Handle transaction status changes
  useEffect(() => {
    if (isConfirmed) {
      setIsSubmitting(false);
      toast({
        title: "Identity Verification Successful!",
        description: `Your identity has been verified on AVAX Fuji C-Chain. Transaction hash: ${hash}`,
      });
    }
  }, [isConfirmed, toast, hash]);

  useEffect(() => {
    if (error) {
      setIsSubmitting(false);
      toast({
        title: "Transaction Failed",
        description:
          error.message || "Failed to submit transaction. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const form = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      documentNumber: "",
      additionalInfo: "",
    },
  });

  const computeIdentityHash = (data: IdentityFormData): string => {
    // Create a deterministic string from the form data
    const dataString = JSON.stringify({
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phoneNumber: data.phoneNumber.trim(),
      address: data.address.trim(),
      documentNumber: data.documentNumber.trim(),
      additionalInfo: data.additionalInfo?.trim() || "",
    });

    // Compute keccak256 hash
    const hash = keccak256(toBytes(dataString));
    return hash;
  };

  const onSubmit = async (data: IdentityFormData) => {
    console.log("onSubmit :", onSubmit);
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description:
          "Please connect your wallet to submit identity verification.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Compute the identity hash
      const identityHash = computeIdentityHash(data);
      setComputedHash(identityHash);

      console.log("Identity Data:", data);
      console.log("Computed Hash (bytes32):", identityHash);
      console.log("User Address:", address);

      // Call the smart contract verify function
      writeContract({
        address: USER_PROOF_HUB,
        abi: CONTRACT_ABI,
        functionName: "verify",
        args: [address as `0x${string}`, identityHash as `0x${string}`],
        chain: avalancheFuji,
        account: address as `0x${string}`,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description:
          "Failed to submit identity verification. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 ">
          <User className="w-5 h-5" />
          <span>Submit Identity Verification</span>
        </CardTitle>
        <CardDescription>
          Verify your identity on AVAX C-Chain by providing the required
          information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Show computed hash if available */}
            {computedHash && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  Identity Proof Generated
                </h4>
                <p className="text-sm text-green-700 mb-2">bytes32 Hash:</p>
                <code className="block p-2 bg-green-100 rounded text-sm font-mono text-green-800 break-all">
                  {computedHash}
                </code>
              </div>
            )}

            {/* Show transaction status */}
            {hash && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Transaction Submitted
                </h4>
                <p className="text-sm text-blue-700 mb-2">Transaction Hash:</p>
                <code className="block p-2 bg-blue-100 rounded text-sm font-mono text-blue-800 break-all">
                  {hash}
                </code>
                {isConfirming && (
                  <p className="text-sm text-blue-600 mt-2">
                    Waiting for confirmation on AVAX Fuji...
                  </p>
                )}
                {isConfirmed && (
                  <p className="text-sm text-green-600 mt-2 font-semibold">
                    ✅ Transaction Confirmed! Identity verified on-chain.
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government ID Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter government ID number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your full address"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information you'd like to provide"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide any additional context that might help with
                    verification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {isConfirming ? (
                <>
                  <FileText className="w-4 h-4 mr-2 animate-spin" />
                  Confirming Transaction...
                </>
              ) : isPending ? (
                <>
                  <FileText className="w-4 h-4 mr-2 animate-spin" />
                  Waiting for Approval...
                </>
              ) : isSubmitting ? (
                <>
                  <FileText className="w-4 h-4 mr-2 animate-spin" />
                  Computing Hash & Submitting...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Submit Identity Verification
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
