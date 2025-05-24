
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, CheckCircle } from 'lucide-react'

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

interface WalletConnectorProps {
  onConnect?: () => void
}

export function WalletConnector({ onConnect }: WalletConnectorProps) {
  const { connectors, connect, isPending } = useConnect()
  const { address, isConnected, connector } = useAccount()

  // 獲取錢包顯示信息
  const getWalletDisplay = (connectorName: string) => {
    return walletDisplayNames[connectorName] || { 
      name: connectorName, 
      description: '支援的錢包' 
    }
  }

  const handleConnect = (connector: any) => {
    connect({ connector })
    if (onConnect) {
      // 延遲執行以確保連接完成
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
          <h3 className="text-lg font-semibold text-gray-900">錢包已連接</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          您已成功連接到 AVAX C-Chain
        </p>
        <div className="p-4 rounded-lg bg-gray-50 border">
          <p className="text-sm text-gray-600 mb-2">錢包地址:</p>
          <p className="text-gray-900 font-mono text-sm break-all">
            {address}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {connectorDisplay.name}
          </Badge>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            AVAX C-Chain
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          選擇您的錢包以連接到 AVAX C-Chain
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
              className="w-full justify-start h-auto p-4 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <Wallet className="w-5 h-5 mr-3 text-blue-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">{walletDisplay.name}</div>
                <div className="text-xs text-gray-500">{walletDisplay.description}</div>
              </div>
            </Button>
          )
        })}
      </div>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          連接錢包即表示您同意我們的服務條款
        </p>
      </div>
    </div>
  )
}
