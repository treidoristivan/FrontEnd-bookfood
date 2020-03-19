import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Theme, createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Container, Toolbar, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Close} from '@material-ui/icons';



const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color:theme.palette.getContrastText('#008080'),
    backgroundColor: '#008080',
    '&:hover': {
      backgroundColor: '#ffcc00',

    },
    margin: theme.spacing(4),
  },
}))(Button);

const useStyles = makeStyles(() => createStyles({  
  appBar: {
    
    backgroundColor: 'rgba(0, 128, 128, 0.2)',
    boxShadow: '0px 1px 8px #ffcc00',
    marginBottom:'0px'
  },
  appBarImg: {
    width: '200px',
    height: '70px'
  },
  ButtonCustom: {
    color: '#008080'
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
          <Toolbar>

          <ThemeProvider >
          <ColorButton color='secondary'  to='/' component={RouterLink}>
                 Ini Home
                </ColorButton>      
                <ColorButton color='secondary'  to='/carts' component={RouterLink}>
                  Ini  Cart
                </ColorButton>
              {
                isLogin ? (
                  <>
                    <ColorButton color='secondary'  to='/profile' component={RouterLink}>
                      Profile
                    </ColorButton>
                
                    <ColorButton color='secondary'  to='/logout' component={RouterLink}>
                       Log ut
                    </ColorButton>
                  </>
                ) : (
                  <>
                  <ColorButton color='secondary'  to='/login' component={RouterLink}>
                       Log in
                    </ColorButton>

                    <ColorButton variant="contained"  color="primary" className={classes.cstm} to='/register' component={RouterLink}>
                      Sign Up
                    </ColorButton>
                  </>
                )
              } 

          </ThemeProvider>

               
        
          </Toolbar>
          
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
