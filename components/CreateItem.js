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
    $image: String
    $largeImage: String
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

  uploadFile = async e => {
    const { files } = e.target
    console.log('uploading')
    const userFiles = files
    const data = new FormData()
    data.append('file', userFiles[0])
    data.append('upload_preset', 'sickFits') // needed by cloudinary

    // send to cloudinary
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dcbz0g43i/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )

    const fileUploaded = await res.json()
    console.log(fileUploaded)
    this.setState({
      image: fileUploaded.secure_url,
      largeImage: fileUploaded.eager[0].secure_url,
    })
  }

  render() {
    const { title, price, description, image } = this.state
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form onSubmit={this.handleSubmit(createItem)}>
            <h2>Sell an Item</h2>
            <Error error={error} />
            <p>fieldset info in this module</p>
            <fieldset disabled={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  placeholder="file"
                  name="file"
                  onChange={this.uploadFile}
                  required
                />
              </label>
              {image && <img width="200" src={image} alt="upload preview" />}
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
