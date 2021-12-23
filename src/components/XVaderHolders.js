import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Card from './Card'

const XVaderHolders = () => {

    const holders = gql`
        query {
            global(id: "UniqueWallet_0x665ff8faa06986bd6f1802fa6c1d2e7d780a7369") {
                value
            }
        }
    `

    const {loading, error, data} = useQuery(holders)

    if(loading) return <Card desc='Loading..' />

    if(error) return <Card desc={error} />

    return (
        <div>
            <Card title='XVader Holders' desc={Number(data.global.value).toLocaleString()} />
        </div>
    )
}

export default XVaderHolders
