import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Item from './item'
import Pagination from './Pagination'
import { perPage } from '../config'

// GraphQL query STRING
// Pass to Apollo Query Component and use as renderProps
// to get access to the data object
// other items available as well

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($first: Int = 4, $skip: Int = 0) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const CenterContent = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

export default class Items extends Component {
  render() {
    const { page } = this.props
    return (
      <CenterContent>
        <Pagination page={parseFloat(page) || 1} />
        <Query
          query={ALL_ITEMS_QUERY}
          // ex page 1 = 4 * 1 - 4 = 0 skipped - for first page is correct
          // variables={{ skip: page * perPage - perPage }}
        >
          {({ data, error, loading }) => {
            if (loading) return <div>...Loading</div>
            if (error) return <div>Error: {JSON.stringify(error)}</div>
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            )
          }}
        </Query>
        <Pagination page={parseFloat(page) || 1} />
      </CenterContent>
    )
  }
}

Items.propTypes = {
  page: PropTypes.string,
}
