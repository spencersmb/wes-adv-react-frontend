import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import Table from './styles/Table'
import SickButton from './styles/SickButton'

const GET_ALL_USERS = gql`
  query GET_ALL_USERS {
    users {
      id
      name
      email
      permission
    }
  }
`
const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

function Permissions(props) {
  return (
    <Query query={GET_ALL_USERS}>
      {({ data, error, loading }) => {
        if (loading) {
          return <p>...Loading</p>
        }
        if (error) {
          return <Error error={error} />
        }
        return (
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => (
                    <th key={permission}>{permission}</th>
                  ))}
                  <th>*</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user, index) => (
                  <UserPermissons user={user} key={index} />
                ))}
              </tbody>
            </Table>
          </div>
        )
      }}
    </Query>
  )
}

const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $userId: ID!
    $email: String
    $name: String
    $permission: [String]
  ) {
    updateUser(
      userId: $userId
      email: $email
      name: $name
      permission: $permission
    ) {
      id
      name
      permission
    }
  }
`

class UserPermissons extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permission: PropTypes.array,
    }).isRequired,
  }

  state = {
    userId: this.props.user.id,
    permission: this.props.user.permission,
  }

  handleCheck = e => {
    const checkBox = e.target

    if (!checkBox.checked) {
      // remove it
      this.setState(state => ({
        permission: state.permission.filter(item => item !== checkBox.value),
      }))
    } else {
      // add it
      this.setState(state => ({
        permission: state.permission.concat(checkBox.value),
      }))
    }
  }

  handleUpdate = updateUser => async e => {
    e.preventDefault()
    console.log('this.state', this.state)
    const res = await updateUser({
      variables: {
        ...this.state,
      },
    })
    console.log('res', res)
  }

  render() {
    const { user } = this.props
    return (
      <Mutation mutation={UPDATE_USER} variables={this.state}>
        {(updateUser, { error, loading }) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {possiblePermissions.map((permission, index) => (
              <td key={index}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input
                    type="checkbox"
                    onChange={this.handleCheck}
                    value={permission}
                    checked={this.state.permission.includes(permission)}
                  />
                </label>
              </td>
            ))}
            <td>
              <SickButton onClick={this.handleUpdate(updateUser)}>
                Update
              </SickButton>
            </td>
          </tr>
        )}
      </Mutation>
    )
  }
}

export default Permissions
