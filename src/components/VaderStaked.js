import React, { useState, useEffect } from 'react'
import Card from './Card'

const VaderStaked = () => {

    const [staked, setStaked] = useState(0)
    
    useEffect(() => {
        (async() => {
            const coval = await (await fetch(`https://api.covalenthq.com/v1/1/address/0x665ff8faa06986bd6f1802fa6c1d2e7d780a7369/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.REACT_APP_COVAL_KEY}`)).json()
        
            setStaked(coval.data.items[0].balance/1e18)
        })()

    }, [])

    return (
        <div>
            <Card title='Total Vader Staked' desc={Number(staked).toLocaleString()} />
        </div>
    )
}

export default VaderStaked
