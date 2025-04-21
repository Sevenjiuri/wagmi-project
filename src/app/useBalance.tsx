import {useAccount, useBalance, useGasPrice, useWalletClient} from 'wagmi'
import { useFeeData } from 'wagmi'
import { type ReactNode, useState } from 'react'
import { serialize, deserialize } from 'wagmi'
import { parseEther } from 'viem'


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

BigInt.prototype.toJSON = function () {
    return this.toString(); // 将 BigInt 转换为字符串
};

function bigIntReplacer(key, value) {
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

//向某个钱包发送token
export function SendTokenComponent() {
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const { data: walletClient } = useWalletClient();
    const { address } = useAccount();
    
    const handleSend = async () => {
        if (!walletClient || !address || !to || !amount) {
            setIsError(true);
            setErrorMessage('请填写完整信息');
            return;
        }
        
        try {
            setIsError(false);
            setIsSuccess(false);
            
            const hash = await walletClient.sendTransaction({
                to,
                value: parseEther(amount),
                account: address,
            });
            
            setIsSuccess(true);
            console.log('交易哈希:', hash);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message || '交易失败');
            console.error('发送交易错误:', error);
        }
    };
    
    return (
        <div>
            <h3>发送代币</h3>
            <div>
                <label>接收地址：</label>
                <input 
                    type="text" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)} 
                    placeholder="输入接收地址" 
                />
            </div>
            <div>
                <label>金额：</label>
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="输入金额" 
                />
            </div>
            <button onClick={handleSend}>发送</button>
            
            {isSuccess && <div style={{ color: 'green' }}>交易已发送！</div>}
            {isError && <div style={{ color: 'red' }}>错误: {errorMessage}</div>}
        </div>
    );
}

// 美化版本的发送代币组件
export const SendTokenComponent2 = () => {
    const { address } = useAccount();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { data: walletClient } = useWalletClient();
    
    const handleSend = async () => {
        if (!walletClient) {
            setIsError(true);
            setErrorMessage('钱包未连接');
            return;
        }
        
        if (!to || !amount) {
            setIsError(true);
            setErrorMessage('请填写接收地址和金额');
            return;
        }
        
        try {
            setIsLoading(true);
            setIsError(false);
            setIsSuccess(false);
            
            const hash = await walletClient.sendTransaction({
                to,
                value: parseEther(amount),
                account: address,
            });
            
            setIsSuccess(true);
            setIsLoading(false);
            console.log('交易哈希:', hash);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            setErrorMessage(error.message || '交易失败');
            console.error('发送交易错误:', error);
        }
    };
    
    return (
        <div className="send-token-container" style={{ 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f8f9fa',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            <h3 style={{ 
                color: '#333', 
                borderBottom: '2px solid #ddd', 
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>发送代币</h3>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontWeight: 'bold',
                    color: '#555'
                }}>接收地址：</label>
                <input 
                    type="text" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)} 
                    placeholder="输入接收地址" 
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontWeight: 'bold',
                    color: '#555'
                }}>金额：</label>
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="输入金额" 
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
            </div>
            
            <button 
                onClick={handleSend}
                disabled={isLoading}
                style={{
                    backgroundColor: isLoading ? '#cccccc' : '#4CAF50',
                    color: 'white',
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '100%',
                    transition: 'background-color 0.3s'
                }}
            >
                {isLoading ? '处理中...' : '发送'}
            </button>
            
            {isSuccess && (
                <div style={{ 
                    color: 'green', 
                    padding: '10px', 
                    marginTop: '15px',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    ✅ 交易已成功发送！
                </div>
            )}
            
            {isError && (
                <div style={{ 
                    color: 'red', 
                    padding: '10px', 
                    marginTop: '15px',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    ❌ 错误: {errorMessage}
                </div>
            )}
        </div>
    );
};





export default getBalance; GasPriceComponent;useFeeDataComponent;SendTokenComponent;SendTokenComponent2