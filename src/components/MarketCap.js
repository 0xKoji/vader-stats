import React, { useEffect, useState } from 'react'
import Card from './Card'

const MarketCap = () => {

    const [marketCap, setMarketCap] = useState(0)
    
    useEffect(() => {
        (async() => {
            const gecko = await (await fetch('https://api.coingecko.com/api/v3/coins/vader-protocol')).json()
        
            setMarketCap(gecko.market_data.market_cap.usd)
        })()
    }, [])


    return (
        <div>
            <Card title='Market Cap' desc={'$' + Number(marketCap).toLocaleString()} />
        </div>
    )
}

export default MarketCap
