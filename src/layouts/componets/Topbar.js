import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/styles'
import { AppBar, 
  Container, 
  Toolbar, 
  ExpansionPanel, 
  ExpansionPanelDetails,
  Button, 
  IconButton, 
  Link, 
  Badge 
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import StoreIcon from '@material-ui/icons/Store';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


import { Close, Input } from '@material-ui/icons'
import logo from '../../assets/logo.png'

const useStyles = makeStyles(() => ({
  appBar: {
    marginTop:'80px',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    boxShadow: '0px 1px 8px #ffcc00',
    marginBottom:'0px'
  },
  appBarImg: {
    width: '200px',
    height: '70px'
  },
  ButtonCustom: {
   
    color: '#ffc400'
  },
  expandPanelIcon: {
    position:'absolute',
    top: 0,
    right:0
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  const { isLogin } = props
  const [toolbarExpand, setToolbarExpand] = React.useState(false)
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
      <AppBar className={classes.appBar} position='sticky' elevation={0}>
        <Container maxWidth='lg' elevation={0}>
          <Toolbar style={{position:'relative'}}>
          <IconButton className={classes.ButtonCustom} to='/' component={RouterLink}>
                      <StoreIcon /> Ini Home
                </IconButton>
            <div className={classes.flexGrow} />
            <div className={classes.flexGrow} />
              
                <IconButton className={classes.ButtonCustom} to='carts' component={RouterLink}>
                      <StoreIcon /> Cart
                </IconButton>
              
              {
                isLogin ? (
                  <>
                  
                    <IconButton className={classes.ButtonCustom} to='/profile' component={RouterLink}>
                      <AssignmentIndIcon /> Profile
                    </IconButton>
                
                    <IconButton className={classes.ButtonCustom} to='/logout' component={RouterLink}>
                      <AssignmentTurnedInIcon /> Log ut
                    </IconButton>
                  </>
                ) : (
                  <>
                  <IconButton className={classes.ButtonCustom} to='/login' component={RouterLink}>
                      <AssignmentLateIcon /> Log in
                    </IconButton>
                  </>
                )
              } 
        
          </Toolbar>
          
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
