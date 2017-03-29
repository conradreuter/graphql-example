import { buildSchema } from 'graphql'
import schemaSource from '../schema.gql'

export default buildSchema(schemaSource)
