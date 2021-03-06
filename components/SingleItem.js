import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import DisplayError from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`

export default class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          console.log(data)

          if (error) return <DisplayError error={error} />
          if (loading) return <div>...Loading</div>
          if (!data.item) return <p>No Item found for {this.props.id}</p>
          const { item } = data
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          )
        }}
      </Query>
    )
  }
}
SingleItem.propTypes = {
  id: PropTypes.string,
}
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  min-height: 880px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`
