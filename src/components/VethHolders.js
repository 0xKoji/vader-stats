import React, { useState, useEffect } from 'react'
import data from '../VethHolders.json'

const VethHolders = () => {

    const [holders, setHolders] = useState(data)
    const [burns, setBurns] = useState([])

    const [onlyHolders, setOnlyHolders] = useState(false)

    useEffect(() => {
        if(onlyHolders === true){
            setBurns([])
        }else if(onlyHolders === false){
            (async() => {
                const burns = await (await fetch(`https://api.covalenthq.com/v1/1/address/0x6d4a43ee4770a2bab97460d3a3b783641d85d108/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=1000000&key=${process.env.REACT_APP_COVAL_KEY}`)).json()
        
                setBurns(burns.data.items)
            })()

        }
    }, [onlyHolders])

    const ret = holders.filter((x) => burns.some((y) => y.from_address === x.address))
    const ret2 = holders.filter((x) => !burns.some((y) => y.from_address === x.address))

    console.log(holders)

    return (
        <div className='bg-zinc-900 border-3 border-black rounded-lg drop-shadow-2xl shadow-inner p-3 text-center mb-6'>
            <h2 className="text-white text-4xl mb-12 underline">Eligible Veth Holders</h2>
            <div className='grid m-3 md:m-0 grid-rows-1 md:grid-cols-3 gap-6'>
                <div className="mb-1">
                    <p><span className='text-green-800'>Green</span> = Burned $VETH for $VADER</p>
                </div>
                <div className="mb-1">
                    <p><span>White</span> = They haven't burned</p>
                </div>
                <div className="mb-1">
                    <p><span className='text-green-800'>{ret.length}</span>/{holders.length}</p>
                </div>
            </div>
            <p className="text-xl text-slate-500 w-full overflow-hidden mt-5 mb-5">The balances are not after snapshot so they might not be accurate.</p>
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" defaultChecked={onlyHolders} onChange={() => setOnlyHolders(!onlyHolders)} id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault"> Only show wallets that have not burned</label>
            </div>
            <nav className='mt-6'>
                <ul className='h-96 w-full overflow-hidden overflow-y-scroll'>
                    {ret.map((item) => {
                        return(
                            <a href={`https://etherscan.io/address/${item.address}`} key={item}><li className="mb-3 p-3 bg-green-800 rounded">{item.address}</li></a>
                        )
                    })}
                    {ret2.map((item) => {
                        return(
                            <a href={`https://etherscan.io/address/${item.address}`} key={item}><li className="mb-3 p-3 bg-gray-800 rounded">{item.address} | {item.balance/1e18} $VETH</li></a>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default VethHolders
