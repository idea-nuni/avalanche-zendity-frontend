
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { keccak256, toBytes } from "viem";
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

const identitySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  documentType: z.string().min(1, "Please select a document type"),
  documentNumber: z
    .string()
    .min(5, "Document number must be at least 5 characters"),
  additionalInfo: z.string().optional(),
});

type IdentityFormData = z.infer<typeof identitySchema>;

export function IdentityVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [computedHash, setComputedHash] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      documentType: "",
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
      documentType: data.documentType.trim(),
      documentNumber: data.documentNumber.trim(),
      additionalInfo: data.additionalInfo?.trim() || "",
    });

    // Compute keccak256 hash
    const hash = keccak256(toBytes(dataString));
    return hash;
  };

  const onSubmit = async (data: IdentityFormData) => {
    setIsSubmitting(true);
    try {
      // Compute the identity hash
      const identityHash = computeIdentityHash(data);
      setComputedHash(identityHash);

      console.log("Identity Data:", data);
      console.log("Computed Hash (bytes32):", identityHash);

      // TODO: Submit to AVAX C-Chain contract with the hash
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Identity Verification Submitted",
        description: `Identity hash: ${identityHash}`,
      });

      // Don't reset form to show the computed hash
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "Failed to submit identity verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
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
                <h4 className="font-semibold text-green-800 mb-2">Identity Hash Generated</h4>
                <p className="text-sm text-green-700 mb-2">bytes32 Hash:</p>
                <code className="block p-2 bg-green-100 rounded text-sm font-mono text-green-800 break-all">
                  {computedHash}
                </code>
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
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
