import _ from 'lodash'
import { GridTile } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'

export default function Article(props) {
  return (
    <GridTile
      key={props.id}
      title={props.name}
      subtitle={!props.rating ? 'no rating' : `Rating: ${_.round(props.rating, 1)}`}
    >
      {!props.image ? 'no image' : <img src={props.image} />}
    </GridTile>
  )
}

Article.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
}
