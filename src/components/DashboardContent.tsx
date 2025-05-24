
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, DollarSign, Activity } from 'lucide-react'

export function DashboardContent() {
  const { address, isConnected, connector } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">歡迎來到 AVAX DApp</h2>
        <p className="text-gray-600">請先連接您的錢包以開始使用</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 歡迎區域 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">歡迎回來！</h1>
        <p className="text-blue-100">您已連接到 AVAX C-Chain</p>
        <div className="mt-4 flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {connector?.name}
          </Badge>
          <span className="text-sm font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總餘額</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 AVAX</div>
            <p className="text-xs text-muted-foreground">
              +0% 自上次檢查
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">交易次數</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              本月交易次數
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">投資組合價值</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              +0% 自昨日
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 最近活動 */}
      <Card>
        <CardHeader>
          <CardTitle>最近活動</CardTitle>
          <CardDescription>
            您的最近交易和活動記錄
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>暫無活動記錄</p>
            <p className="text-sm">開始使用錢包進行交易後，活動記錄將顯示在此處</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
