import React from 'react'
import PropTypes from 'prop-types'
import UpdateItem from '../components/UpdateItem'

const UpdateItemComponent = props => (
  <div>
    <UpdateItem id={props.query.id} />
  </div>
)

UpdateItemComponent.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
}
export default UpdateItemComponent
