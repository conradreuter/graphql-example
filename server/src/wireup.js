import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Catalog, Recommender } from './domain'

export default function wireup() {
  const data = JSON.parse(readFileSync(resolve(__dirname, 'data.json')))
  const recommender = new Recommender().hydrate(data.recommendations)
  const catalog = new Catalog(recommender).hydrate(data.articles)
  return catalog
}
