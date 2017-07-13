import { readFileSync } from 'fs'
import { buildSchema } from 'graphql'
import { resolve } from 'path'

const schemaSource = readFileSync(resolve(__dirname, 'schema.gql'))
export default buildSchema(schemaSource.toString('utf-8'))
