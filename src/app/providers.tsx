'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider ,useAccount } from 'wagmi'

import { getConfig } from '@/wagmi'

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

    const MyComponent = () => {
        const { address, isConnecting, isDisconnected } = useAccount();
        if (isConnecting) return <div>Connecting...</div>;
        if (isDisconnected) return <div>Disconnected</div>;
        return <div>Connected Wallet: {address}</div>;
    };

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}

      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
