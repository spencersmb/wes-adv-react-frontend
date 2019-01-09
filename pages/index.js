import React from 'react'
import PropTypes from 'prop-types'
import Items from '../components/items'

const Home = props => (
  <div>
    <h1>Home page</h1>
    <Items page={props.query.page} />
  </div>
)
Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
}
export default Home
