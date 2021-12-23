import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol-mainnet',
  cache: new InMemoryCache()
})

ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  ,
  document.getElementById('root')
);
