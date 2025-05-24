import { useAccount, useReadContract } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { IdentityVerificationForm } from "./IdentityVerificationForm";
import { SupportedBlockchains } from "./SupportedBlockchains";
import { USER_PROOF_HUB } from "@/constants";
import { avalancheFuji } from "wagmi/chains";

// Contract ABI for reading user verification status
const USER_PROOF_HUB_ABI = [
  {
    inputs: [{ name: "user", type: "address" }],
    name: "isUserVerified",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserProofHash",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function VerifyIdentitiesContent() {
  const { address, isConnected } = useAccount();

  // Read user verification status from contract
  const { data: isVerified, isLoading: isCheckingVerification } =
    useReadContract({
      address: USER_PROOF_HUB,
      abi: USER_PROOF_HUB_ABI,
      functionName: "isUserVerified",
      args: address ? [address as `0x${string}`] : undefined,
      chainId: avalancheFuji.id,
      query: {
        enabled: !!address && isConnected,
      },
    });

  // Read user proof hash from contract
  const { data: userProofHash, isLoading: isLoadingProofHash } =
    useReadContract({
      address: USER_PROOF_HUB,
      abi: USER_PROOF_HUB_ABI,
      functionName: "getUserProofHash",
      args: address ? [address as `0x${string}`] : undefined,
      chainId: avalancheFuji.id,
      query: {
        enabled: !!address && isConnected,
      },
    });

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Zendity</h2>
        <p className="text-gray-400">
          Please connect your wallet to start the identity verification process
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Area */}
      <div>
        <h1 className="text-3xl font-bold text-white">Zendity</h1>
        <p className="text-gray-400 mt-2">
          Verify your identity on AVAX C-Chain and sync across multiple
          blockchains
        </p>
      </div>

      {/* Verification Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">
              Successfully verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Verification failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Current User Identity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Your Identity Status</span>
          </CardTitle>
          <CardDescription>
            Current verification status for the connected wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-300">
                Wallet Address
              </p>
              <p className="font-mono text-sm text-gray-400">{address}</p>
              <div className="flex items-center space-x-2">
                {isCheckingVerification ? (
                  <>
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 border-gray-700"
                    >
                      <Clock className="w-3 h-3 mr-1 animate-spin" />
                      Checking...
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Checking verification status...
                    </span>
                  </>
                ) : isVerified ? (
                  <>
                    <Badge
                      variant="secondary"
                      className="bg-green-900/20 text-green-400 border-green-800"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Identity verified on-chain
                    </span>
                  </>
                ) : (
                  <>
                    <Badge
                      variant="secondary"
                      className="bg-red-900/20 text-red-400 border-red-800"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Not Verified
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Complete verification below
                    </span>
                  </>
                )}
              </div>
              {isVerified &&
                userProofHash &&
                userProofHash !==
                  "0x0000000000000000000000000000000000000000000000000000000000000000" && (
                  <div className="mt-3 p-3 bg-green-900/10 rounded-lg border border-green-800/30">
                    <p className="text-sm font-medium text-green-300 mb-1">
                      On-Chain Proof Hash:
                    </p>
                    <code className="text-xs font-mono text-green-400 break-all block">
                      {userProofHash}
                    </code>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identity Verification Form */}
      <IdentityVerificationForm />

      {/* Supported Blockchains */}
      <SupportedBlockchains />
    </div>
  );
}
