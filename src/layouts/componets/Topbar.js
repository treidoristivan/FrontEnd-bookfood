import React from 'react'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import { Theme, withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Container, Toolbar, Drawer, Button, Link, Badge } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import { connect } from 'react-redux'

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color:theme.palette.getContrastText('#008080'),
    backgroundColor: '#ffcc00',
    '&:hover': {
      backgroundColor: '#008080',

    },
    control: {
      padding: theme.spacing(5),
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  appBar: {
    paddingTop: '10px',
    paddingBottom: '10px',
    background: 'linear-gradient(180deg,#353232d4,#3532328a,#35323214, transparent)',
    transition: '.5s ease-out background-color',
    overflow: 'hidden'
  },
  appBarWhite: {
    background: 'primary',
    boxShadow: '5px 0px 5px rgba(0,0,0,.4)'
  },
  ButtonCustom: {
    margin: 2,
    color: 'primary',
    fontWeight: 800,
    borderRadius:'10%'
  },
  BtnGray: {
    color: 'secondary'
  },
  expandPanelIcon: {
    postion: 'absolute',
    top: 0,
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  const { isLogin, totalItem } = props
  const [toolbarExpand, setToolbarExpand] = React.useState(false)
  const [isTop, setIsTop] = React.useState(1) 
  const handleExpand = () => {
    setToolbarExpand(!toolbarExpand)
  }
  document.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      setIsTop(1)
    } else {
      setIsTop(0)
    }
  })
  return (
    <>
              <ThemeProvider >

      <AppBar className={clsx(classes.appBar, (!isTop && classes.appBarWhite),(!props.isHome && classes.appBarWhite))} position={props.isHome ? 'fixed' : 'sticky'} elevation={0}>
        <Container maxWidth='lg' elevation={0}>
          <Toolbar style={{ position: 'relative' }}>
            <Link to='/' component={RouterLink}>
              <img alt='logo' height='48px' src={isTop && props.isHome ? logo2 : logo} />
            </Link>
            <div className={classes.flexGrow} />
            <ColorButton color='primary' onClick={handleExpand} className={clsx(classes.ButtonCustom, classes.expandPanelIcon, (!isTop && classes.BtnGray), (!props.isHome && classes.BtnGray))}><ExpandMoreIcon /></ColorButton>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.flexGrow} />
      <Drawer open={toolbarExpand} anchor='top' onClose={() => setToolbarExpand(0)}>
        <Container style={{ paddingTop: '10px', paddingBottom: '10px'}}>
          <Toolbar>
            <div className={classes.flexGrow} />

            <ColorButton color='secondary'  to='/carts' component={RouterLink} className={clsx(classes.ButtonCustom, classes.BtnGray)}>
            <Badge color='error' badgeContent={totalItem}> Cart</Badge>
            </ColorButton>     
            {
              !isLogin ? (
               <>
                  <ColorButton size='small'  color='primary' to='/login' component={RouterLink} sizeSmall>Sign In</ColorButton>
                </>
              ) : (
                
                 <>
                 <ColorButton color='primary' to='/profile' component={RouterLink} className={clsx(classes.ButtonCustom, classes.BtnGray)}>Profile</ColorButton>
                 <ColorButton color='primary'  to='/logout' component={RouterLink} className={clsx(classes.ButtonCustom, classes.BtnGray)}>Log Out</ColorButton>
               </>
              )
            }
            <ColorButton color='primary' onClick={handleExpand} className={clsx(classes.ButtonCustom, classes.BtnGray)}><ExpandLessIcon /></ColorButton>
          </Toolbar>
        </Container>
      </Drawer>
      </ThemeProvider>
    </>
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.dataUser.isLogin,
  totalItem: state.dataCart.totalTypeItems
})
export default connect(mapStateToProps)(Topbar)