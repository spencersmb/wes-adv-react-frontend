import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

class RequestReset extends Component {
  state = {
    email: '',
  }

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = reset => async e => {
    e.preventDefault()
    await reset()
    this.setState({
      email: '',
    })
  }

  render() {
    return (
      <Mutation mutation={RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form method="post" onSubmit={this.onSubmit(reset)}>
            {/* disable form and show loading indicator */}
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Password</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email for a reset link!</p>
              )}
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Reset Password</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default RequestReset
