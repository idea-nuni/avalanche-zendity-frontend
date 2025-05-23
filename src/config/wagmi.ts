
import { createConfig, http } from 'wagmi'
import { avalanche } from 'wagmi/chains'
import { injected, walletConnect, metaMask } from '@wagmi/connectors'

export const config = createConfig({
  chains: [avalanche],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId: 'your-project-id', // 您需要在 walletconnect.com 註冊獲取
      metadata: {
        name: 'AVAX DApp',
        description: 'Connect to AVAX C-Chain',
        url: 'https://yourdapp.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    }),
  ],
  transports: {
    [avalanche.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
