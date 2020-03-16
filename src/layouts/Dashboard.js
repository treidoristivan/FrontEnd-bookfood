import React from 'react'
import DashboardNav from './componets/DashboardNav'

function MainLayout (props) {
  const { children, isLogin } = props
  return (
    <>
      <DashboardNav isLogin={isLogin} />
      <div style={{ marginTop: 50 }}>
        {children}
      </div>
    </>
  )
}

export default MainLayout
