import React from 'react'
import { Route as RouterLink } from 'react-router-dom'
function CustomRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, isHome, ...anotherProps } = props
  return (
    <RouterLink
      {...anotherProps}
      render={(matchProps) => (
        <Layout isHome={isHome}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export default CustomRoute
