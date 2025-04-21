'use client'

import {
    cookieStorage,
    createConfig,
    createStorage,
    http,
    useAccount,
    useBalance, useFeeHistory,
    useGasPrice,
    WagmiProvider
} from "wagmi";
import {confluxESpace, confluxESpaceTestnet, polygon} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConnectKitProvider, getDefaultConfig} from "connectkit";
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { ConnectKitButton } from "connectkit";



const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [confluxESpace ,confluxESpaceTestnet],
        transports: {
            // RPC URL for each chain
            [confluxESpace.id]: http(),
            [confluxESpaceTestnet.id]: http(),
            [polygon.id]: http(),
        },
        connectors: [
            injected(),
            coinbaseWallet(),

        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        // Required API Keys
        walletConnectProjectId: "4b7e2951838f0908b6f8d0743fb8676b",
        // Required App Info
        appName: "ninesun.site",
        // Optional App Info
        appDescription: "ninesun.site",
        appUrl: "https://ninesun.site", // your app's url
        appIcon: "https://ninesun.site/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const queryClient = new QueryClient();



export const ExampleButton = () => {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                return (
                    <button onClick={show} theme="retro">
                        {isConnected ? address : "Custom Connect"}
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    );
};


// @ts-ignore
const MyComponent = ({ value, onChange}) => {
    onChange=()=>{
        const { address, isConnecting, isDisconnected } = useAccount();
        const _balance = useBalance()
        const {data } = useGasPrice()
        const  history   =useFeeHistory()
        const balanceData = _balance.data;
    }
    value="1";
    const { address, isConnecting, isDisconnected } = useAccount();
    const _balance = useBalance()
    const {data } = useGasPrice()
    const  history   =useFeeHistory()
    const balanceData = _balance.data;
    // @ts-ignore
    const balance = balanceData?.decimals
    if (isConnecting) return <div>Connecting...</div>;
    if (isDisconnected) return <div>Disconnected</div>;
    // return
    return (
        <div>
            <div>useBalance:{JSON.stringify(_balance)}</div>
            <div>Balance:{JSON.stringify(balance)}</div>
            <div>gasPrice:{data}</div>
            <div>value:{value}</div>
            Connected Wallet: {address}
        </div>
    )
};







export const Web3Provider = ({ children }) => {

    const handleCallFromChild = (number: number) => {
        console.log('Parent method called via context');

    };

    const {data } = useGasPrice()

    const handleInputChange = (newValue: any) => {
        // setInputValue(newValue);
        console.log('Input value updated:', newValue);
    };
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider   client={queryClient}>
                <ConnectKitProvider
                    options={{
                        language: "zh-CN",
                    }}
                    onConnect={({address, connectorId}) => {
                        console.log(address, connectorId, '已连接');
                        const _balance = useBalance()
                        handleCallFromChild(2)
                    }}
                    onDisconnect={() => {
                        console.log('已断开连接');
                    }}
                >
                    {/*<ExampleButton/>*/}
                    <MyComponent value={1} onChange={handleInputChange}/>
                    {children}

                    <div>gasPrice:{data}</div>
                </ConnectKitProvider>

            </QueryClientProvider>
        </WagmiProvider>
    );
};