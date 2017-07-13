import { AppBar, GridList } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Article from './Article'
import articlesQuery from './articles.gql'
const STYLES = require('./Catalog.css')

function Catalog(props) {
  return (
    <div className={STYLES.root}>
      <AppBar showMenuIconButton={false} title="Catalog" />
      <div className={STYLES.content}>
        {props.data.loading ? 'Loading articles...' : (
          <GridList cellHeight={300} cols={3}>
            {props.data.articles.map(article => (
              <Article key={article.id} {...article} />
            ))}
          </GridList>
        )}
      </div>
    </div>
  )
}

Catalog.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
  }).isRequired,
}

export default compose(
  graphql(articlesQuery),
)(Catalog)
