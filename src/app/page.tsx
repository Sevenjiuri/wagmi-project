'use client'

// import { useAccount, useConnect, useDisconnect ,useBalance } from 'wagmi'
// import {default as Providers} from './providers'
import {ConnectKitButton, ConnectKitProvider} from "connectkit";
import {Web3Provider} from "@/app/Web3Wallet";
// import {default as  onSessionProposal} from "./reown/reown"
import {getBalance as Balance,GasPriceComponent,useFeeDataComponent as UseFeeDataComponent,SendTokenComponent2} from "@/app/useBalance";
import React from "react";

function App() {


  return (
    <>
      <Web3Provider >
          <ConnectKitButton/>
         <Balance/>
          <GasPriceComponent/>
          <UseFeeDataComponent/>
          <SendTokenComponent2/>
      </Web3Provider>
    </>
  )
}

export default App
