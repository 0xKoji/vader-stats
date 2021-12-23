import React, { useEffect, useState } from 'react'
import Card from './Card'


const CirculatingSupply = () => {

    const [supply, setSupply] = useState(0)

    useEffect(() => {
        (async () => {
            const gecko = await (await fetch('https://api.coingecko.com/api/v3/coins/vader-protocol')).json()
        
            setSupply(gecko.market_data.circulating_supply)
        })()

    }, [])

    return <Card title='Circulating Supply' desc={Number(supply).toLocaleString()} />
}

export default CirculatingSupply
