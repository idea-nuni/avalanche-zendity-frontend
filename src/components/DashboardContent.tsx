
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to AVAX DApp</h2>
        <p className="text-gray-600">Please connect your wallet to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Area */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-blue-100">You are connected to AVAX C-Chain</p>
        <div className="mt-4 flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {connector?.name}
          </Badge>
          <span className="text-sm font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 AVAX</div>
            <p className="text-xs text-muted-foreground">
              +0% from last check
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              +0% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your recent transactions and activity history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No activity yet</p>
            <p className="text-sm">Activity will appear here once you start using your wallet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
