import {useBalance, useGasPrice} from 'wagmi'
import { useFeeData } from 'wagmi'
import { serialize, deserialize } from 'wagmi'
export function getBalance() {
    const { data, isError, isLoading } = useBalance({
        address: '0x9210Dcf509ABEB15e39E3171851Ff8B4F24D9b97',
    })

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
        <div>
            Balance: {data?.formatted} {data?.symbol}
        </div>
    )
}

export function GasPriceComponent() {
    const { data, isLoading, isError, error } = useGasPrice();
    const pr=useGasPrice()

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;
    // 1CFX=10^18 Drip.
    // 1GDrip =10^9Drip

    return (
        <div>
            Current Gas Price:{JSON.stringify(data)} {data}   {JSON.stringify(pr,bigIntReplacer)}  wei
        </div>
    );
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString(); // 将 BigInt 转换为字符串
};

function bigIntReplacer(key: any, value: { toString: () => any }) {
    if (typeof value === 'bigint') {
        return value.toString(); // 将 BigInt 转换为字符串
    }
    return value;
}





export function useFeeDataComponent() {
    const { data, isError, isLoading } = useFeeData()

    if (isLoading) return <div>Fetching fee data…</div>
    if (isError) return <div>Error fetching fee data</div>
    return <div>Fee data: {JSON.stringify(data?.formatted)}</div>
}





export default getBalance; GasPriceComponent;useFeeDataComponent