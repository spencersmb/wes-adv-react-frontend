import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formateMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
    ) {
      id
      title
      description
      price
    }
  }
`

export default class UpdateItem extends Component {
  state = {}

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val,
    })
  }

  handleSubmit = updateItem => async e => {
    e.preventDefault()
    const res = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    })
    console.log('res', res)

    // redirect
    Router.push({
      pathname: '/item',
      query: {
        id: res.data.updateItem.id,
      },
    })
  }

  render() {
    console.log('item ID', this.props.id)

    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          const { title, price, description } = data.item
          console.log('query data', data)
          if (loading) {
            return <div>...Loading</div>
          }
          if (!data.item) {
            return <div>No Item Found!</div>
          }
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { error }) => (
                <Form onSubmit={this.handleSubmit(updateItem)}>
                  <h2>Update </h2>
                  <Error error={error} />
                  <fieldset disabled={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        placeholder="title"
                        name="title"
                        defaultValue={title}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        placeholder="price"
                        name="price"
                        defaultValue={price}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        type="text"
                        id="description"
                        placeholder="description"
                        name="description"
                        defaultValue={description}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
