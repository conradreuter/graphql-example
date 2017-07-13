import { MuiThemeProvider } from 'material-ui'
import React from 'react'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import Catalog from './Catalog'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/api/graphql',
  }),
})

export default function Root(props) {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider>
        <Catalog />
      </MuiThemeProvider>
    </ApolloProvider>
  )
}
