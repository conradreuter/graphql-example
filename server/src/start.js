import express from 'express'
import graphql from 'express-graphql'
import wireup from './wireup'

// switch between the schema defined via the JS API or in the GrapphQL schema language
import schema from './schema-js'
//import schema from './schema-gql'

const catalog = wireup()
const app = express()
app.use('/graphql', graphql({
  graphiql: true,
  rootValue: catalog,
  schema,
}));
app.listen(3000)
