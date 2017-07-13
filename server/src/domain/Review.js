export default class Review {

  constructor(article) {
    this.article = article
  }

  hydrate(data) {
    this.author = data.author
    this.date = data.date instanceof Date ? data.date : new Date(data.date)
    this.id = data.id
    this.rating = data.rating
    this.text = data.text
    return this
  }
}
