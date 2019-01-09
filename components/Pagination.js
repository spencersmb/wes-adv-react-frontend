import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'
import Head from 'next/head'
import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (error) return <p>Error</p>
      if (loading) return <div>...Loading</div>
      const { count } = data.itemsConnection.aggregate
      const pages = Math.ceil(count / perPage)
      const { page } = props
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits! | Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: {
                page: page - 1,
              },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              prev
            </a>
          </Link>
          <p>
            Page {props.page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: {
                page: page + 1,
              },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      )
    }}
  </Query>
)

Pagination.propTypes = {
  page: PropTypes.number,
}

export default Pagination
