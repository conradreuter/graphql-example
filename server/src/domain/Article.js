import _ from 'lodash'
import Review from './Review'

export default class Article {

  constructor(catalog) {
    this.catalog = catalog
  }

  hydrate(data) {
    this.category = data.category
    this.description = data.description
    this.id = data.id
    this.image = data.image
    this.name = data.name
    this.reviewsById =
      _(data.reviews)
      .map(review => new Review(this).hydrate(review))
      .keyBy('id')
      .value()
    return this
  }

  postReview(review) {
    const reviewId = _.random(10, 100) // generate somehow
    const id = `${this.id}-${reviewId}`
    const author = 'conrad' // fetch via authentication?
    const date = new Date()
    review = _.assign({ id, date }, review),
    this.reviewsById[id] = new Review(this).hydrate(review)
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
