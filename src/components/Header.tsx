
import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Wallet, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { WalletConnector } from './WalletConnector'

export function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { address, isConnected, connector } = useAccount()
  const { disconnect } = useDisconnect()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">AVAX DApp</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Trading</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Settings</a>
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4" />
                  <span className="font-mono text-sm">{formatAddress(address || '')}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">Connected Wallet</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {connector?.name}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      AVAX C-Chain
                    </Badge>
                  </div>
                </div>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => disconnect()}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <WalletConnector onConnect={() => setIsWalletModalOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  )
}
