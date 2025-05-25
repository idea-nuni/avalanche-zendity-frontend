import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { createPublicClient, http } from "viem";
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
  Network,
  Zap,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { USER_PROOF_HUB, USER_PROOF_HUB_ECHO } from "@/constants";

// Echo L1 chain configuration
const echoL1 = {
  id: 173750,
  name: "Echo L1 Testnet",
  network: "echo-l1-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "AVAX",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: {
      http: ["https://subnets.avax.network/echo/testnet/rpc"],
    },
    public: {
      http: ["https://subnets.avax.network/echo/testnet/rpc"],
    },
  },
} as const;

// Create public client for Echo L1
const echoClient = createPublicClient({
  chain: echoL1,
  transport: http("https://subnets.avax.network/echo/testnet/rpc"),
});

// Contract ABI for reading user verification status and transportProof
const USER_PROOF_HUB_ABI = [
  {
    inputs: [{ name: "user", type: "address" }],
    name: "isUserVerified",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "destinationAddress", type: "address" },
      { name: "destinationBlockchainID", type: "bytes32" },
    ],
    name: "transportProof",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

interface Blockchain {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "available" | "syncing" | "verified";
  lastSync: string | null;
  network: string;
  type: "c-chain" | "l1";
  chainId?: number;
  rpcUrl?: string;
  subnetId?: string;
  blockchainId?: string;
  proofHubAddress?: string;
}

const supportedBlockchains: Blockchain[] = [
  {
    id: "avax-c-chain",
    name: "Avalanche C-Chain",
    logo: "",
    status: "connected",
    lastSync: "2024-01-15 14:30:00",
    network: "C-Chain",
    type: "c-chain",
    proofHubAddress: USER_PROOF_HUB,
  },
  {
    id: "echo-l1-testnet",
    name: "Echo L1 Testnet",
    logo: "",
    status: "available",
    lastSync: null,
    network: "L1",
    type: "l1",
    chainId: 173750,
    rpcUrl: "https://subnets.avax.network/echo/testnet/rpc",
    subnetId: "i9gFpZQHPLcGfZaQLiwFAStddQD7iTKBpFfurPFJsXm1CkTZK",
    proofHubAddress: USER_PROOF_HUB_ECHO,
    blockchainId:
      "0x1278d1be4b987e847be3465940eb5066c4604a7fbd6e086900823597d81af4c1",
  },
  {
    id: "dispatch-l1-testnet",
    name: "Dispatch L1 Testnet",
    logo: "",
    status: "available",
    lastSync: null,
    network: "L1",
    type: "l1",
    chainId: 779672,
    rpcUrl: "https://subnets.avax.network/dispatch/testnet/rpc",
    subnetId: "7WtoAMPhrmh5KosDUsFL9yTcvw7YSxiKHPpdfs4JsgW47oZT5",
    blockchainId:
      "0x9f3be606497285d0ffbb5ac9ba24aa60346a9b1812479ed66cb329f394a4b1c7",
  },
];

export function SupportedBlockchains() {
  const [syncingChains, setSyncingChains] = useState<Set<string>>(new Set());
  const [isEchoVerified, setIsEchoVerified] = useState<boolean | undefined>(
    undefined
  );
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Check user verification status on C-Chain
  const { data: isCChainVerified } = useReadContract({
    address: USER_PROOF_HUB,
    abi: USER_PROOF_HUB_ABI,
    functionName: "isUserVerified",
    args: address ? [address as `0x${string}`] : undefined,
    chainId: avalancheFuji.id,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Check user verification status on Echo L1 using custom client
  useEffect(() => {
    const checkEchoVerification = async () => {
      if (!address || !isConnected) {
        setIsEchoVerified(undefined);
        return;
      }

      try {
        const result = await echoClient.readContract({
          address: USER_PROOF_HUB_ECHO as `0x${string}`,
          abi: USER_PROOF_HUB_ABI,
          functionName: "isUserVerified",
          args: [address as `0x${string}`],
        });
        setIsEchoVerified(result as boolean);
        console.log("isEchoVerified from Echo L1 RPC:", result);
      } catch (error) {
        console.error("Error checking Echo L1 verification:", error);
        setIsEchoVerified(false);
      }
    };

    checkEchoVerification();
  }, [address, isConnected]);

  // Function to get verification status for a specific blockchain
  const getVerificationStatus = (blockchain: Blockchain): boolean => {
    if (!blockchain.proofHubAddress) return false;

    switch (blockchain.id) {
      case "avax-c-chain":
        return !!isCChainVerified;
      case "echo-l1-testnet":
        return !!isEchoVerified;
      default:
        return false;
    }
  };

  const handleSync = async (blockchain: Blockchain) => {
    if (!address || !isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to sync identity.",
        variant: "destructive",
      });
      return;
    }

    if (!blockchain.proofHubAddress || !blockchain.blockchainId) {
      toast({
        title: "Configuration Missing",
        description: "Target blockchain configuration is incomplete.",
        variant: "destructive",
      });
      return;
    }

    setSyncingChains((prev) => new Set(prev).add(blockchain.id));

    try {
      console.log(`Syncing identity to ${blockchain.name}...`);
      console.log(`Destination address: ${blockchain.proofHubAddress}`);
      console.log(`Destination blockchain ID: ${blockchain.blockchainId}`);

      // Call transportProof function on the source chain (C-Chain)
      writeContract({
        address: USER_PROOF_HUB,
        abi: USER_PROOF_HUB_ABI,
        functionName: "transportProof",
        args: [
          blockchain.proofHubAddress as `0x${string}`,
          blockchain.blockchainId as `0x${string}`,
        ],
        chain: avalancheFuji,
        account: address as `0x${string}`,
      });

      // Note: Transaction success will be handled by useEffect
    } catch (error) {
      console.error("Transport error:", error);
      toast({
        title: "Sync Failed",
        description: `Failed to sync identity to ${blockchain.name}. Please try again.`,
        variant: "destructive",
      });
      setSyncingChains((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blockchain.id);
        return newSet;
      });
    }
  };

  // Handle transaction status changes
  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: "Identity Synced Successfully",
        description: `Your identity has been synced via ICM. Transaction: ${hash}`,
      });

      // Clear syncing status
      setSyncingChains(new Set());
    }
  }, [isConfirmed, hash, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Transaction Failed",
        description:
          error.message || "Failed to submit transaction. Please try again.",
        variant: "destructive",
      });

      // Clear syncing status
      setSyncingChains(new Set());
    }
  }, [error, toast]);

  const getStatusIcon = (blockchain: Blockchain, isSyncing: boolean) => {
    if (isSyncing) {
      return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
    }

    // Check if user is verified on this specific chain
    if (blockchain.proofHubAddress && getVerificationStatus(blockchain)) {
      return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    }

    switch (blockchain.status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "syncing":
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
      default:
        return <Network className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (blockchain: Blockchain, isSyncing: boolean) => {
    if (isSyncing) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          Syncing
        </Badge>
      );
    }

    // Check if user is verified on this specific chain
    if (blockchain.proofHubAddress && getVerificationStatus(blockchain)) {
      return (
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    }

    switch (blockchain.status) {
      case "connected":
        return (
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Connected
          </Badge>
        );
      case "syncing":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            Syncing
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-gray-700 text-gray-300 border-gray-600"
          >
            Available
          </Badge>
        );
    }
  };

  const getSyncStatusText = (blockchain: Blockchain, isSyncing: boolean) => {
    if (isSyncing) {
      return "Syncing identity verification...";
    }

    // Check if user is verified on this specific chain
    if (blockchain.proofHubAddress && getVerificationStatus(blockchain)) {
      return "Identity verified on-chain";
    }

    if (blockchain.status === "connected") {
      return blockchain.lastSync
        ? `Last synced: ${new Date(blockchain.lastSync).toLocaleString()}`
        : "Connected";
    }

    if (blockchain.status === "syncing") {
      return "Syncing...";
    }

    return "Available for identity sync";
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Network className="w-5 h-5" />
          <span>Supported Avalanche Networks</span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Sync your verified identity across Avalanche C-Chain and L1 networks
          using ICM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {supportedBlockchains.map((blockchain) => {
            const isSyncing =
              syncingChains.has(blockchain.id) ||
              blockchain.status === "syncing";
            const isCChain = blockchain.type === "c-chain";

            return (
              <div
                key={blockchain.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                  isCChain
                    ? "border-red-500/30 bg-red-500/5 hover:bg-red-500/10"
                    : "border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl">{blockchain.logo}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-white">
                        {blockchain.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs bg-gray-700 text-gray-300 border-gray-600"
                      >
                        {blockchain.network}
                      </Badge>
                      {isCChain && (
                        <Badge
                          variant="outline"
                          className="bg-red-500/20 text-red-300 border-red-500/30 text-xs"
                        >
                          Primary
                        </Badge>
                      )}
                      {blockchain.chainId && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-gray-700 text-gray-300 border-gray-600"
                        >
                          Chain ID: {blockchain.chainId}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(blockchain, isSyncing)}
                      <span className="text-sm text-gray-400">
                        {getSyncStatusText(blockchain, isSyncing)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(blockchain, isSyncing)}

                  <Button
                    onClick={() => handleSync(blockchain)}
                    disabled={
                      isSyncing || blockchain.status === "connected" || isCChain
                    }
                    size="sm"
                    variant={
                      blockchain.status === "connected" ? "default" : "outline"
                    }
                    className={`${
                      blockchain.status === "connected"
                        ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                    }`}
                  >
                    {isCChain ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Source Chain
                      </>
                    ) : isSyncing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-pulse" />
                        Syncing...
                      </>
                    ) : blockchain.status === "connected" ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Synced
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Sync Identity
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="flex items-start space-x-3">
            <Network className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-300 mb-1">
                Avalanche Cross-Chain Identity
              </h4>
              <p className="text-sm text-red-200">
                Your identity is verified on Avalanche C-Chain as the source of
                truth. You can then sync it to other Avalanche L1 networks using
                Interchain Messaging (ICM) for seamless cross-chain identity
                verification across the Avalanche ecosystem.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
