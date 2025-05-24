
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Network, Zap, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Blockchain {
  id: string
  name: string
  logo: string
  status: 'connected' | 'available' | 'syncing'
  lastSync: string | null
  network: string
  type: 'c-chain' | 'l1'
  chainId?: number
  rpcUrl?: string
  subnetId?: string
  blockchainId?: string
}

const supportedBlockchains: Blockchain[] = [
  {
    id: 'avax-c-chain',
    name: 'Avalanche C-Chain',
    logo: '🔴',
    status: 'connected',
    lastSync: '2024-01-15 14:30:00',
    network: 'C-Chain',
    type: 'c-chain'
  },
  {
    id: 'echo-l1-testnet',
    name: 'Echo L1 Testnet',
    logo: '🔊',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1',
    chainId: 173750,
    rpcUrl: 'https://subnets.avax.network/echo/testnet/rpc',
    subnetId: 'i9gFpZQHPLcGfZaQLiwFAStddQD7iTKBpFfurPFJsXm1CkTZK',
    blockchainId: '0x1278d1be4b987e847be3465940eb5066c4604a7fbd6e086900823597d81af4c1'
  },
  {
    id: 'dispatch-l1-testnet',
    name: 'Dispatch L1 Testnet',
    logo: '📨',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1',
    chainId: 779672,
    rpcUrl: 'https://subnets.avax.network/dispatch/testnet/rpc',
    subnetId: '7WtoAMPhrmh5KosDUsFL9yTcvw7YSxiKHPpdfs4JsgW47oZT5',
    blockchainId: '0x9f3be606497285d0ffbb5ac9ba24aa60346a9b1812479ed66cb329f394a4b1c7'
  }
]

export function SupportedBlockchains() {
  const [syncingChains, setSyncingChains] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const handleSync = async (blockchain: Blockchain) => {
    setSyncingChains(prev => new Set(prev).add(blockchain.id))
    
    try {
      // TODO: Call ICM function to sync identity across Avalanche L1s
      console.log(`Syncing identity to ${blockchain.name}...`)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast({
        title: "Identity Synced Successfully",
        description: `Your identity has been synced to ${blockchain.name} via ICM.`,
      })
      
      // Update blockchain status (in real app, this would come from the backend)
      blockchain.status = 'connected'
      blockchain.lastSync = new Date().toISOString()
      
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: `Failed to sync identity to ${blockchain.name}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setSyncingChains(prev => {
        const newSet = new Set(prev)
        newSet.delete(blockchain.id)
        return newSet
      })
    }
  }

  const getStatusIcon = (status: string, isSyncing: boolean) => {
    if (isSyncing) {
      return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
    }
    
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'syncing':
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
      default:
        return <Network className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string, isSyncing: boolean) => {
    if (isSyncing) {
      return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Syncing</Badge>
    }
    
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Connected</Badge>
      case 'syncing':
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Syncing</Badge>
      default:
        return <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">Available</Badge>
    }
  }

  const getSyncStatusText = (blockchain: Blockchain, isSyncing: boolean) => {
    if (isSyncing) {
      return "Syncing identity verification..."
    }
    
    if (blockchain.status === 'connected') {
      return blockchain.lastSync 
        ? `Last synced: ${new Date(blockchain.lastSync).toLocaleString()}`
        : "Connected"
    }
    
    if (blockchain.status === 'syncing') {
      return "Syncing..."
    }
    
    return "Available for identity sync"
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Network className="w-5 h-5" />
          <span>Supported Avalanche Networks</span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Sync your verified identity across Avalanche C-Chain and L1 networks using ICM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {supportedBlockchains.map((blockchain) => {
            const isSyncing = syncingChains.has(blockchain.id) || blockchain.status === 'syncing'
            const isCChain = blockchain.type === 'c-chain'
            
            return (
              <div
                key={blockchain.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                  isCChain 
                    ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10' 
                    : 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl">{blockchain.logo}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-white">{blockchain.name}</h3>
                      <Badge variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                        {blockchain.network}
                      </Badge>
                      {isCChain && (
                        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                          Primary
                        </Badge>
                      )}
                      {blockchain.chainId && (
                        <Badge variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                          Chain ID: {blockchain.chainId}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(blockchain.status, isSyncing)}
                      <span className="text-sm text-gray-400">
                        {getSyncStatusText(blockchain, isSyncing)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(blockchain.status, isSyncing)}
                  
                  <Button
                    onClick={() => handleSync(blockchain)}
                    disabled={isSyncing || blockchain.status === 'connected' || isCChain}
                    size="sm"
                    variant={blockchain.status === 'connected' ? 'default' : 'outline'}
                    className={`${
                      blockchain.status === 'connected' 
                        ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600'
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
                    ) : blockchain.status === 'connected' ? (
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
                  
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="flex items-start space-x-3">
            <Network className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-300 mb-1">Avalanche Cross-Chain Identity</h4>
              <p className="text-sm text-red-200">
                Your identity is verified on Avalanche C-Chain as the source of truth. You can then 
                sync it to other Avalanche L1 networks using Interchain Messaging (ICM) for seamless 
                cross-chain identity verification across the Avalanche ecosystem.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
