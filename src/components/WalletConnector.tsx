
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, CheckCircle } from 'lucide-react'

// Wallet display names mapping
const walletDisplayNames: Record<string, { name: string; description: string }> = {
  'MetaMask': { 
    name: 'MetaMask', 
    description: 'Most popular Ethereum wallet' 
  },
  'WalletConnect': { 
    name: 'WalletConnect', 
    description: 'Connect mobile wallets' 
  },
  'Injected': { 
    name: 'Browser Wallet', 
    description: 'Use browser built-in wallet' 
  },
  'Coinbase Wallet': { 
    name: 'Coinbase Wallet', 
    description: 'Official Coinbase wallet' 
  }
}

interface WalletConnectorProps {
  onConnect?: () => void
}

export function WalletConnector({ onConnect }: WalletConnectorProps) {
  const { connectors, connect, isPending } = useConnect()
  const { address, isConnected, connector } = useAccount()

  // Get wallet display information
  const getWalletDisplay = (connectorName: string) => {
    return walletDisplayNames[connectorName] || { 
      name: connectorName, 
      description: 'Supported wallet' 
    }
  }

  const handleConnect = (connector: any) => {
    connect({ connector })
    if (onConnect) {
      // Delay execution to ensure connection completes
      setTimeout(() => {
        onConnect()
      }, 1000)
    }
  }

  if (isConnected) {
    const connectorDisplay = getWalletDisplay(connector?.name || '')
    
    return (
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h3 className="text-lg font-semibold text-white">Wallet Connected</h3>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          You have successfully connected to AVAX C-Chain
        </p>
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-gray-300 mb-2">Wallet Address:</p>
          <p className="text-white font-mono text-sm break-all">
            {address}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary" className="bg-purple-900 text-purple-200">
            {connectorDisplay.name}
          </Badge>
          <Badge variant="secondary" className="bg-red-900 text-red-200">
            AVAX C-Chain
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-300">
          Choose your wallet to connect to AVAX C-Chain
        </p>
      </div>
      <div className="space-y-3">
        {connectors.map((connector) => {
          const walletDisplay = getWalletDisplay(connector.name)
          
          return (
            <Button
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              disabled={isPending}
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white"
            >
              <Wallet className="w-5 h-5 mr-3 text-blue-400" />
              <div className="text-left">
                <div className="font-medium text-white">{walletDisplay.name}</div>
                <div className="text-xs text-gray-300">{walletDisplay.description}</div>
              </div>
            </Button>
          )
        })}
      </div>
      <div className="pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          By connecting a wallet, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
