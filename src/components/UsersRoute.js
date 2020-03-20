import React from 'react'
import jwt from 'jsonwebtoken'
import { Route as RouterLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
function UserRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, token, ...anotherProps } = props
  if (token) {
    const payload = jwt.decode(token)
    if ((new Date(payload.exp * 1000).getTime() - new Date().getTime()) <= 0) {
      return (
        <Redirect to='/logout' />
      )
    }
    const role = payload.role
    if (role && role >= 1 && role <= 3) {
      return (
        <RouterLink
          {...anotherProps}
          render={(matchProps) => (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          )}
        />
      )
    } else {
      return <Redirect to='/login?' />
    }
  }
  return <Redirect to='/login' />
}

const mapStateToProps = (state) => ({
  token: state.dataUser.token
})
export default connect(mapStateToProps)(UserRoute)
