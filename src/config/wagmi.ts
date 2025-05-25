
import { createConfig, http } from 'wagmi'
import {  avalancheFuji } from 'wagmi/chains'
import { injected, walletConnect, metaMask } from '@wagmi/connectors'

export const config = createConfig({
  chains: [avalancheFuji],
  connectors: [
    injected(),
    metaMask(),
    // 暫時移除 WalletConnect 以避免 QR code modal 問題
    // walletConnect({ 
    //   projectId: 'your-project-id', // 您需要在 walletconnect.com 註冊獲取
    //   metadata: {
    //     name: 'AVAX DApp',
    //     description: 'Connect to AVAX C-Chain',
    //     url: 'https://yourdapp.com',
    //     icons: ['https://avatars.githubusercontent.com/u/37784886']
    //   }
    // }),
  ],
  transports: {
    [avalancheFuji.id]: http(),

  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
