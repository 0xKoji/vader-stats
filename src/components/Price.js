import React, { useState, useEffect } from 'react'
import Card from './Card'

const Price = () => {

    const [price, setPrice] = useState(0)
    
    useEffect(() => {
        (async() => {
            const gecko = await (await fetch('https://api.coingecko.com/api/v3/coins/vader-protocol')).json()
        
            setPrice(gecko.market_data.current_price.usd)
        })()
    }, [])

    return (
        <div>
            <Card title='Price' desc={'$' + price} />
        </div>
    )
}

export default Price
