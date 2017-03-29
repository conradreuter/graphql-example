import express from 'express'
import graphql from 'express-graphql'

// switch between the schema defined via the JS API or in the GrapphQL schema language
import schema from './schema-js'
//import schema from './schema-gql'

import allData from './data.json'
import { createCatalog } from './domain'
const catalog = createCatalog(allData)

// starts the GraphQL server on http://localhost:3000/graphql
const app = express()
app.use('/graphql', graphql({
  graphiql: true,
  rootValue: catalog,
  schema,
}));
app.listen(3000)
