import React, { useState, useEffect } from 'react'
import Card from './Card'

const VethBurn = () => {
    const [burns, setBurns] = useState(0)
    
    useEffect(async() => {
        const coval = await (await fetch(`https://api.covalenthq.com/v1/1/address/0x6d4a43ee4770a2bab97460d3a3b783641d85d108/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.REACT_APP_COVAL_KEY}`)).json()
        
        setBurns(coval.data.items[0].balance/1e18)
    }, [])

    return (
        <div>
            <Card title='VADER left for VETH burns' desc={Number(burns).toLocaleString() + ' / 7,500,000,000'} secondDesc={Number(burns / 7500000000 * 100).toLocaleString() + '% Left'} note='Half unlocked immediately and half 1 year vested.' />
        </div>
    )
}

export default VethBurn
