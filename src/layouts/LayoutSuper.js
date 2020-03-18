import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { Close } from '@material-ui/icons'
import AppBar from './componets/AppBar'
import DashboardSuper from './componets/DashboardSuper'

function LayoutSuper (props) {
  const { children, isLogin } = props
  const [toolbarExpand, setToolbarExpand] = React.useState(0)
  const expandedIcon = () => {
    if (toolbarExpand) {
      return (<Close />)
    } else {
      return (<MenuIcon />)
    }
  }
  const handleExpand = () => {
    setToolbarExpand(!toolbarExpand)
  }
  return (
    <>
      <AppBar isLogin={isLogin} expandedIcon={expandedIcon} handleExpand={handleExpand}/>
      <DashboardSuper setOpen={setToolbarExpand} open={toolbarExpand} />
      <div style={{ marginTop: 50 }}>
        {children}
      </div>
    </>
  )
}

export default LayoutSuper
