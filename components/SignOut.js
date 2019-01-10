import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`

class SignOut extends Component {
  handleClick = signout => async e => {
    e.preventDefault()
    await signout()
  }

  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        update={(cache, { data }) => {
          // const currentCache = cache.readQuery({ query: CURRENT_USER_QUERY })
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: { me: null },
          })
        }}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signout, { error, loading }) => (
          <button type="button" onClick={this.handleClick(signout)}>
            Sign Out
          </button>
        )}
      </Mutation>
    )
  }
}

export default SignOut
