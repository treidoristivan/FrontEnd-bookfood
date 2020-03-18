import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, IconButton, Link } from '@material-ui/core'
import logo from '../../assets/logo.png'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'white'
  },
  ButtonCategories: {
    margin: 2,
    color: '#222',
    fontWeight: 800
  },
  expandPanelIcon: {
    postion: 'absolute',
    top: 0,
    right: 0
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function DashboardNav (props) {
  const classes = useStyles()
  const {handleExpand, expandedIcon} = props
  return (
    <>
      <AppBar className={classes.appBar} style={{ zIndex: '9999' }} position='sticky'>
        <Container>
          <Toolbar style={{ position: 'relative' }}>
            <IconButton onClick={handleExpand} className={clsx(classes.ButtonCategories, classes.expandPanelIcon)}>{expandedIcon()}</IconButton>
            <div className={classes.flexGrow} />
            <Link to='/' component={RouterLink}>
              <img alt='logo' src={logo} />
            </Link>
            <div className={classes.flexGrow} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default DashboardNav
