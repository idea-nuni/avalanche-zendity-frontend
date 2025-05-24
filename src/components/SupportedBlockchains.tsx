
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
    id: 'dexalot-l1',
    name: 'Dexalot L1',
    logo: '🟦',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1'
  },
  {
    id: 'gunzilla-l1',
    name: 'Gunzilla L1',
    logo: '⚫',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1'
  },
  {
    id: 'beam-l1',
    name: 'Beam L1',
    logo: '🟨',
    status: 'syncing',
    lastSync: '2024-01-15 12:15:00',
    network: 'L1',
    type: 'l1'
  },
  {
    id: 'amplify-l1',
    name: 'Amplify L1',
    logo: '🟢',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1'
  },
  {
    id: 'xplus-l1',
    name: 'XPlus L1',
    logo: '🟣',
    status: 'available',
    lastSync: null,
    network: 'L1',
    type: 'l1'
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
      return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
    }
    
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'syncing':
        return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
      default:
        return <Network className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string, isSyncing: boolean) => {
    if (isSyncing) {
      return <Badge className="bg-yellow-100 text-yellow-700">Syncing</Badge>
    }
    
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-700">Connected</Badge>
      case 'syncing':
        return <Badge className="bg-yellow-100 text-yellow-700">Syncing</Badge>
      default:
        return <Badge variant="secondary">Available</Badge>
    }
  }

  const getSyncStatusText = (blockchain: Blockchain, isSyncing: boolean) => {
    if (isSyncing) {
      return "正在同步身份驗證..."
    }
    
    if (blockchain.status === 'connected') {
      return blockchain.lastSync 
        ? `上次同步: ${new Date(blockchain.lastSync).toLocaleString()}`
        : "已連接"
    }
    
    if (blockchain.status === 'syncing') {
      return "同步中..."
    }
    
    return "可同步身份驗證"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Network className="w-5 h-5" />
          <span>Supported Avalanche Networks</span>
        </CardTitle>
        <CardDescription>
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
                className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                  isCChain ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl">{blockchain.logo}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{blockchain.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {blockchain.network}
                      </Badge>
                      {isCChain && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 text-xs">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(blockchain.status, isSyncing)}
                      <span className="text-sm text-gray-600">
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
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : ''
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
                  
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start space-x-3">
            <Network className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900 mb-1">Avalanche Cross-Chain Identity</h4>
              <p className="text-sm text-red-700">
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
