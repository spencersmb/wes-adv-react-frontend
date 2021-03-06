import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
      permission
    }
  }
`

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = signin => async e => {
    e.preventDefault()
    try {
      await signin()
      this.setState({
        email: '',
        password: '',
      })
    } catch (error) {
      // console.log('GQL ERROR', error)
    }
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        update={(cache, { data }) => {
          // const currentCache = cache.readQuery({ query: CURRENT_USER_QUERY })
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: { me: { ...data.signin } },
          })
        }}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form method="post" onSubmit={this.onSubmit(signin)}>
            {/* disable form and show loading indicator */}
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
              <Error error={error} />
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
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default SignIn
