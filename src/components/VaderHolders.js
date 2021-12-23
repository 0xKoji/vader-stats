import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Card from './Card'

const VaderHolders = () => {

    const holders = gql`
        query {
            global(id: "UniqueWallet_0x2602278ee1882889b946eb11dc0e810075650983") {
                value
              }
        }
    `

    const {loading, error, data} = useQuery(holders)

    if(loading) return <Card desc='Loading..' />

    if(error) return <Card desc={error} />

    return (
        <div>
            <Card title='Vader Holders' desc={Number(data.global.value).toLocaleString()} />
        </div>
    )
}

export default VaderHolders
