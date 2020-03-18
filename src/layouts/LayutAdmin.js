import React from 'react'
import AppBar from './componets/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import { Close } from '@material-ui/icons'
import DashboardAdmin from './componets/DashboardAdmin'

export default function LayoutAdmin (props) {
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
      <AppBar isLogin={isLogin} handleExpand={handleExpand} expandedIcon={expandedIcon} />
      <DashboardAdmin setOpen={setToolbarExpand} open={toolbarExpand} />
      <div style={{ marginTop: 50 }}>
        {children}
      </div>
    </>
  )
}
