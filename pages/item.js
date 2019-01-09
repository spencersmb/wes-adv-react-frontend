import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SingleItem from '../components/SingleItem'

export default class ItemPage extends Component {
  render() {
    return (
      <div>
        <SingleItem id={this.props.query.id} />
      </div>
    )
  }
}

ItemPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
}
