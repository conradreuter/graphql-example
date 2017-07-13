import _ from 'lodash'
import Article from './Article'

export default class Catalog {

  constructor(recommender) {
    this.recommender = recommender
  }

  hydrate(data) {
    this.articlesById =
      _(data)
      .map(article => new Article(this).hydrate(article))
      .keyBy('id')
      .value()
    return this
  }

  article({ articleId }) {
    return this.articlesById[articleId]
  }

  articles({ category }) {
    let articles = _.values(this.articlesById)
    if (category) articles = _.filter(articles, { category })
    return articles
  }

  postReview({ articleId, review }) {
    const article = this.article({ articleId })
    if (!article) return null
    article.postReview(review)
    return article
  }
}
