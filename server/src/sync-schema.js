import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { resolve } from 'path'
import schema from './schema-js'

const schemaSource = printSchema(schema)
writeFileSync(resolve(__dirname, 'schema.gql'), schemaSource)
