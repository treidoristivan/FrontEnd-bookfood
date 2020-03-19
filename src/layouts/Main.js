import React from 'react'
import Topbar from './componets/Topbar'
import Footer from './componets/Footer'

function MainLayout (props) {
  const { children, isLogin } = props
  return (
    <>
      <Topbar isLogin={isLogin} />
      {children}
      <Footer isLogin={isLogin}/>
    
    </>
  )
}

export default MainLayout
