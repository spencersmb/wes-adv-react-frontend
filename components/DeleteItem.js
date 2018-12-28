import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './items'

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

export default class DeleteItem extends Component {
  static propTypes = {
    children: PropTypes.string,
    id: PropTypes.string.isRequired,
  }

  handleButtonClick = deleteItem => async e => {
    e.preventDefault()
    const res = await deleteItem(this.props.id)
  }

  // cache is current stuff in browser
  // payload is what was returned to us from the server
  handleUpdate = (cache, payload) => {
    // manually update cache on the client to match server
    // ALL_ITEMS_QUERY is the query used to display all the data
    // so thats the one we use to edit and update locally
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })

    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: {
        items: data.items.filter(
          item => item.id !== payload.data.deleteItem.id
        ),
      },
    })
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.handleUpdate}
      >
        {(deleteItem, { loading, error }) => (
          <button
            disabled={loading}
            type="button"
            onClick={this.handleButtonClick(deleteItem)}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    )
  }
}
