import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { join } from 'path'
import schema from './src/schema-js'

const schemaSource = printSchema(schema)
writeFileSync(join(__dirname, 'schema.gql'), schemaSource)
