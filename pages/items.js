import React from 'react'
import PropTypes from 'prop-types'
import Items from '../components/items'

const ItemsPage = props => (
  <div>
    <h1>Items page</h1>
    <Items page={props.query.page} />
  </div>
)
ItemsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
}
export default ItemsPage
