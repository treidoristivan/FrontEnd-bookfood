import React from 'react'
import { Route as RouterLink, Redirect } from 'react-router-dom'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

function AdminRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, isLogin, setIsLogin, ...anotherProps } = props
  if (cookie.get('ujang')) {
    const role = jwt.decode(cookie.get('ujang')).role
    if (role && (role=== 2 || role === 3)) {
      return (
        <RouterLink
          {...anotherProps}
          render={(matchProps) => (
            <Layout isLogin={isLogin}>
              <Component {...matchProps} isLogin={isLogin} setIsLogin={setIsLogin} />
            </Layout>
          )}
        />
      )
    } else {
      return <Redirect to='/403?' />
    }
  }
  return <Redirect to='/login' />
}

export default AdminRoute
