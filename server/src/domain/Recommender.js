import _ from 'lodash'

export default class Recommender {

  constructor() {
  }

  hydrate(data) {
    this.recommendationsById =
      _(data)
      .flatMap(group => _.map(group, articleId => [articleId, _.without(group, articleId)]))
      .fromPairs()
      .value()
    return this
  }

  recommendations(articleId) {
    return this.recommendationsById[articleId] || []
  }
}
