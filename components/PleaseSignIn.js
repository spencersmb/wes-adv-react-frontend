import { Query } from 'react-apollo'
import React from 'react'
import PropTypes from 'prop-types'
import { CURRENT_USER_QUERY } from './User'
import SignIn from './SignIn'
import Error from './Permissions'

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>...Loading</p>
      if (error) {
        return <Error error={error} />
      }
      if (!data.me) {
        return (
          <div>
            Please Sign In
            <SignIn />
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

PleaseSignIn.propTypes = {
  children: PropTypes.element,
}

export default PleaseSignIn
