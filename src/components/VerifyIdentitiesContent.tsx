
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, User, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function VerifyIdentitiesContent() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">身份驗證</h2>
        <p className="text-gray-600">請先連接您的錢包以進行身份驗證</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 標題區域 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">身份驗證</h1>
        <p className="text-gray-600 mt-2">管理和驗證用戶身份</p>
      </div>

      {/* 驗證狀態概覽 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待驗證</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">
              等待審核的身份
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已驗證</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">
              通過驗證的身份
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">被拒絕</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">
              驗證失敗的身份
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 當前用戶身份狀態 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>您的身份狀態</span>
          </CardTitle>
          <CardDescription>
            當前連接錢包的身份驗證狀態
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium">錢包地址</p>
              <p className="font-mono text-sm text-gray-600">{address}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  待驗證
                </Badge>
                <span className="text-sm text-gray-500">身份驗證正在處理中</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ShieldCheck className="w-4 h-4 mr-2" />
              開始驗證
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 驗證列表 */}
      <Card>
        <CardHeader>
          <CardTitle>驗證請求</CardTitle>
          <CardDescription>
            最近的身份驗證請求列表
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { address: '0x742d35...8f1a', status: 'pending', time: '2小時前' },
              { address: '0x893b21...4c2d', status: 'verified', time: '1天前' },
              { address: '0x456ef7...9a1b', status: 'rejected', time: '2天前' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <User className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-mono text-sm">{item.address}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      item.status === 'verified' ? 'default' : 
                      item.status === 'pending' ? 'secondary' : 
                      'destructive'
                    }
                    className={
                      item.status === 'verified' ? 'bg-green-100 text-green-700' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }
                  >
                    {item.status === 'verified' ? '已驗證' :
                     item.status === 'pending' ? '待審核' : '已拒絕'}
                  </Badge>
                  {item.status === 'pending' && (
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600">
                        批准
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        拒絕
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
