import React from 'react'
import PropTypes from 'prop-types'
import ResetPasswordForm from '../components/Reset'

const Reset = props => (
  <div>
    <ResetPasswordForm token={props.query.resetToken} />
  </div>
)

Reset.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string,
  }),
}
export default Reset
