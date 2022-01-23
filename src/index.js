import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Stats from './pages/Stats';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol-mainnet',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stats' element={<Stats />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


