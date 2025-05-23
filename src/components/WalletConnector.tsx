
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, LogOut, CheckCircle } from 'lucide-react'

// 錢包顯示名稱映射
const walletDisplayNames: Record<string, { name: string; description: string }> = {
  'MetaMask': { 
    name: 'MetaMask', 
    description: '最受歡迎的以太坊錢包' 
  },
  'WalletConnect': { 
    name: 'WalletConnect', 
    description: '連接移動錢包' 
  },
  'Injected': { 
    name: '瀏覽器錢包', 
    description: '使用瀏覽器內建錢包' 
  },
  'Coinbase Wallet': { 
    name: 'Coinbase Wallet', 
    description: 'Coinbase 官方錢包' 
  }
}

export function WalletConnector() {
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, connector } = useAccount()

  // 獲取錢包顯示信息
  const getWalletDisplay = (connectorName: string) => {
    return walletDisplayNames[connectorName] || { 
      name: connectorName, 
      description: '支援的錢包' 
    }
  }

  if (isConnected) {
    const connectorDisplay = getWalletDisplay(connector?.name || '')
    
    return (
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <CardTitle className="text-white">錢包已連接</CardTitle>
          </div>
          <CardDescription className="text-gray-300">
            您已成功連接到 AVAX C-Chain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-black/20 border border-white/10">
            <p className="text-sm text-gray-300 mb-2">錢包地址:</p>
            <p className="text-white font-mono text-sm break-all">
              {address}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {connectorDisplay.name}
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              AVAX C-Chain
            </Badge>
          </div>
          <Button 
            onClick={() => disconnect()}
            variant="outline" 
            className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            斷開連接
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Wallet className="w-8 h-8 text-blue-400" />
          <CardTitle className="text-white">連接錢包</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          選擇您的錢包以連接到 AVAX C-Chain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {connectors.map((connector) => {
          const walletDisplay = getWalletDisplay(connector.name)
          
          return (
            <div key={connector.uid} className="space-y-1">
              <Button
                onClick={() => connect({ connector })}
                disabled={isPending}
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                <Wallet className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{walletDisplay.name}</div>
                  <div className="text-xs text-gray-400">{walletDisplay.description}</div>
                </div>
              </Button>
            </div>
          )
        })}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center">
            連接錢包即表示您同意我們的服務條款
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
