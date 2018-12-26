import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formateMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String!
    $largeImage: String!
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

export default class CreateItem extends Component {
  state = {
    title: 'cool shoes',
    price: 14000,
    description: 'Nike Air Max Boosters',
    image: '',
    largeImage: '',
  }

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val,
    })
  }

  handleSubmit = createItem => async e => {
    e.preventDefault()
    const res = await createItem(this.state)
    console.log(res)

    // redirect
    Router.push({
      pathname: '/item',
      query: {
        id: res.data.createItem.id,
      },
    })
  }

  render() {
    const { title, price, description } = this.state
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form onSubmit={this.handleSubmit(createItem)}>
            <h2>Sell an Item</h2>
            <Error error={error} />
            <fieldset disabled={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  placeholder="title"
                  name="title"
                  value={title}
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
                  value={price}
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
                  value={description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
