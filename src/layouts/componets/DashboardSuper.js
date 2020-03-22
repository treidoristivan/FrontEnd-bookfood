import React from 'react'
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Category, Dashboard, Fastfood, Input, AccountCircle, Home } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  sideNav: {
    width:'270px',
    paddingTop:'80px'
  }
})
export default function DashboardLayout (props) {
  const closses = useStyles()
  const handleClose = (e) => {
    props.setOpen(0)
  }
  return (
    <Drawer open={props.open} onClose={handleClose}>
      <Grid justify='center' maxWidht='xl' container className={closses.sideNav}>
        <List>
          <ListItem button to='/' component={Link}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button to='/admin' component={Link}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button to='/admin/categories' component={Link}>
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary='Categories' />
          </ListItem>
          <ListItem button to='/admin/items' component={Link}>
            <ListItemIcon><Fastfood /></ListItemIcon>
            <ListItemText primary='Items' />
          </ListItem>
          <ListItem button to='/profile' component={Link}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button to='/logout' component={Link}>
            <ListItemIcon><Input /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Grid>
    </Drawer>
  )
}
