import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { WalletConnector } from "./WalletConnector";

export function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="border-b border-gray-800 bg-black shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <h1 className="text-xl font-bold text-white">Zendity</h1>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    {formatAddress(address || "")}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 border-gray-700"
              >
                <div className="px-3 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    Connected Wallet
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-800 text-gray-200"
                    >
                      {connector?.name}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-red-900 text-red-200"
                    >
                      AVAX C-Chain
                    </Badge>
                  </div>
                </div>
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-800">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="text-red-400 hover:bg-gray-800 focus:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog
              open={isWalletModalOpen}
              onOpenChange={setIsWalletModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-center text-white">
                    Connect Wallet
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <WalletConnector
                    onConnect={() => setIsWalletModalOpen(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}
