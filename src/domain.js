import _ from 'lodash'

class Article {

  constructor(catalog, articleData) {
    this.catalog = catalog
    this.category = articleData.category
    this.description = articleData.description
    this.id = articleData.id
    this.name = articleData.name
    this.reviewsById =
      _(articleData.reviews)
      .map(reviewData => new Review(this, reviewData))
      .keyBy('id')
      .value()
  }

  postReview(reviewData) {
    const reviewId = _.random(10, 100) // generate somehow
    const id = `${this.id}-${reviewId}`
    const author = 'conrad' // fetch via authentication?
    const date = new Date()
    reviewData = { id, date, ...reviewData },
    this.reviewsById[id] = new Review(this, reviewData)
  }

  rating() {
    if (_.isEmpty(this.reviewsById)) return null
    return _.sumBy(_.values(this.reviewsById), 'rating') / _.size(this.reviewsById)
  }

  recommendations() {
    const recommendedArticleIds = this.catalog.recommender.recommendations(this.id)
    return _.map(recommendedArticleIds, articleId => this.catalog.article({ articleId }))
  }

  reviews() {
    return _.values(this.reviewsById)
  }
}

class Catalog {

  constructor(recommender, articlesData) {
    this.articlesById =
      _(articlesData)
      .map(articleData => new Article(this, articleData))
      .keyBy('id')
      .value()
    this.recommender = recommender
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

class Recommender {

  constructor(recommendationsData) {
    this.recommendationsById =
      _(recommendationsData)
      .flatMap(group => _.map(group, articleId => [articleId, _.without(group, articleId)]))
      .fromPairs()
      .value()
  }

  recommendations(articleId) {
    return this.recommendationsById[articleId] || []
  }
}

class Review {

  constructor(article, reviewData) {
    this.article = article
    this.author = reviewData.author
    this.date = reviewData.date instanceof Date ? reviewData.date : new Date(reviewData.date)
    this.id = reviewData.id
    this.rating = reviewData.rating
    this.text = reviewData.text
  }
}

export function createCatalog(allData) {
  const recommender = new Recommender(allData.recommendations)
  return new Catalog(recommender, allData.articles)
}
