import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, TextField, Card, CardHeader, Button, CardMedia, CardActions, Snackbar, Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../components/CustomTextField'
import submitData from '../../helpers/submitData'
import logo from '../../assets/logo.png'
import { connect } from 'react-redux'
import { setUserLogin, getCart } from '../../store/actions'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc00'
      },
      secondary: {
        main: '#008080'
    }
  },  
});
const useStyles = makeStyles({
  content: {
    marginTop: '40px'
  },
  containerForm: {
    padding: '20px',
    backgroundColor: 'white'
  },
  img: {
    width: '180px',
    height: '60px'
  }
})
const initialFormLogin = {username: '', password: ''}
const msgRequired = 'This is Required'
const validationFormLogin = Yup.object({
  username: Yup.string().required(msgRequired),
  password: Yup.string().required(msgRequired)
})

function Login (props) {
  const classes = useStyles()
  const history = useHistory()
  const { setIsLogin } = props
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <MuiThemeProvider theme={theme}>

      <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
        <Grid item md={5} lg={4}>
          <Card className={classes.containerForm} elevation={6}>
            <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} className={classes.img}/>} />
            <CardMedia>
              <Formik
                initialValues={initialFormLogin}
                validationSchema={validationFormLogin}
                onSubmit={async (values, form) => {
                  try {
                    const response = await submitData('/login', values)
                    if (response && response.data.success) {
                      setUserLogin(response.data.data.token, response.data.data.dataUser)
                      getCart()
                      history.push('/')
                    }
                    setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                  } catch (e) {
                    console.log(e)
                    setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                  }
                }}
              >

                <Form>
                  <CustomTextField component={TextField} fullWidth margin='normal' name='username' type='text' label='Username' variant='outlined' />
                  <CustomTextField component={TextField} fullWidth margin='normal' name='password' type='password' label='password' variant='outlined' />
                  <Button
                    type='submit'
                    fullWidth
                    size='large'
                    variant='contained'
                    color='secondary'
                  >
                    <strong>Sign In</strong>
                  </Button>
                </Form>
              </Formik>
            </CardMedia>
            <CardActions>
            <Typography variant='p' color='textSecondary'>Don't have Account?</Typography>
            <Button size='medium' variant='contained' color='primary' to='/register' component={Link}>
              Sign Up
            </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>
      </MuiThemeProvider>

    </>
  )
}
const mapDispatchtoProps = {
  setUserLogin,
  getCart
}
export default connect(null, mapDispatchtoProps)(Login)
