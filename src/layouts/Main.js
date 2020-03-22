import React from 'react'
import Topbar from './componets/Topbar'
import Footer from './componets/Footer'

function MainLayout (props) {
  const { children } = props
  return (
    <>
      <Topbar  />
      {children}
      <Footer />
    
    </>
  )
}

export default MainLayout
