import React from 'react'
import Topbar from './componets/Topbar'

function MainLayout (props) {
  const { children, isLogin } = props
  return (
    <>
      <Topbar isLogin={isLogin} />
      {children}
    </>
  )
}

export default MainLayout
