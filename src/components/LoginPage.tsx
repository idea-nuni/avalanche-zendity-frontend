
import { WalletConnector } from './WalletConnector'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 背景動畫元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo 和標題 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            AVAX DApp
          </h1>
          <p className="text-gray-300 text-lg">
            連接您的錢包開始使用
          </p>
        </div>

        {/* 錢包連接卡片 */}
        <WalletConnector />

        {/* 底部信息 */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            支援 MetaMask、WalletConnect 等主流錢包
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">AVAX C-Chain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Web3 Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* 裝飾性網格 - 使用簡單的 CSS 背景 */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(156, 146, 172, 0.05) 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }}>
      </div>
    </div>
  )
}
