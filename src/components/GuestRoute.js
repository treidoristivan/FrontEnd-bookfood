import React from 'react'
import { Route as RouterLink } from 'react-router-dom'
function CustomRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, isLogin, setIsLogin, ...anotherProps } = props
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
}

export default CustomRoute
