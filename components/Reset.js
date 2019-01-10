import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const RESET_PW_MUTATION = gql`
  mutation RESET_PW_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      token: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
      permission
    }
  }
`

class ResetPasswordForm extends Component {
  state = {
    confirmPassword: '',
    password: '',
    resetToken: '',
  }

  componentDidMount() {
    this.setState({
      resetToken: this.props.token || '',
    })
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
      password: '',
      confirmPassword: '',
      resetToken: '',
    })
  }

  render() {
    return (
      <Mutation
        mutation={RESET_PW_MUTATION}
        variables={this.state}
        update={(cache, { data }) => {
          // const currentCache = cache.readQuery({ query: CURRENT_USER_QUERY })
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: { me: { ...data.resetPassword } },
          })
        }}
      >
        {(reset, { error, loading }) => (
          <Form method="post" onSubmit={this.onSubmit(reset)}>
            {/* disable form and show loading indicator */}
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Password</h2>
              <p style={{ display: 'none' }}>{this.state.resetToken}</p>
              <Error error={error} />
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
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Reset</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
ResetPasswordForm.propTypes = {
  token: PropTypes.string,
}
export default ResetPasswordForm
