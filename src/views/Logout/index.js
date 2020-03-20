import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUserLogin, clearCart } from '../../store/actions'
function Logout (props) {
  props.removeUserLogin()
  props.clearCart()
  return (<Redirect to='/login' />)
}

export default connect(null, { removeUserLogin, clearCart })(Logout)
