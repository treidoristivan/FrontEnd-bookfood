import React from 'react'
import {Link} from 'react-router-dom'
import {
  Grid, Paper, TextField, Button, Dialog, DialogTitle, Slide, DialogContent,
  Typography, Snackbar,
  DialogActions
} from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import qs from 'query-string'
import submitData from '../../helpers/submitData'
import CustomTextField from '../../components/CustomTextField'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction='down' {...props} />
))
function ForgotPassword (props) {
  const [openDialog, setOpenDialog] = React.useState(0)
  const [linkResetPassword, setlinkResetPassword] = React.useState('')
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg(prevState=>({ ...prevState,display: 0 }))
  }
  const params = qs.parse(props.location.search)
  return (
    <>
    <MuiThemeProvider theme={theme}>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      {!params.verify && (
        <>
          <Dialog open={openDialog} onClose={() => setOpenDialog(0)} TransitionComponent={Transition}>
            <DialogTitle color='primary'>Ready To Change Password</DialogTitle>
            <DialogContent align='center'>
              <div>
                <CheckCircle style={{ height: '100px', width: '100px' }} color='secondary' />
              </div>
              <Typography variant='h6' color='primary'>
                This Link To Change Password, open link to change password {linkResetPassword && <Link onClick={() => setOpenDialog(0)} to={linkResetPassword}>Link to Reset Password</Link>}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button color='primary' size='large' onClick={() => setOpenDialog(0)}>Ok</Button>
            </DialogActions>
          </Dialog>                           
          <Grid container justify='center' style={{ marginTop: '20px' }}>
            <Grid xs={10} sm={8} md={6}>
              <Paper style={{ padding: '20px' }}>
                <Formik
                  initialValues={{ username: '' }}
                  validationSchema={Yup.object({ username: Yup.string().required('Username is required') })}
                  onSubmit={ async (values) => {
                    try {
                      const response = await submitData('/forgot-password', values)
                      console.log(response)
                      if (response.data && response.data.success) {
                        setlinkResetPassword(`/forgot-password?verify=${response.data.code_verify}`)
                        setOpenDialog(1)
                      } else {
                        setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                      }
                    } catch (e) {
                      console.log(e)
                      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                    }
                  }
                  }
                >
                  <Form>
                    <CustomTextField fullWidth margin='normal' label='Username' name='username' variant='outlined' component={TextField} />
                    <Button variant='contained' color='primary' fullWidth type='submit' style={{textTransform:'capitalize'}}>Reqeuest Reset Link</Button>
                  </Form>
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </>)}
      {params.verify && (
        <>
          <Dialog open={openDialog} onClose={() => setOpenDialog(0)} TransitionComponent={Transition}>
            <DialogTitle color='primary'>Change Password Success</DialogTitle>
            <DialogContent align='center'>
              <div>
                <CheckCircle style={{ height: '100px', width: '100px' }} color='secondary' />
              </div>
              <Typography variant='h6' color='primary'>
                Success to change password please <Link to='/login' >Login</Link>
              </Typography>
            </DialogContent>
          </Dialog> 
          <Grid container justify='center' style={{ marginTop:'500px'}}>
            <Grid xs={10} sm={8} md={6}>
              <Paper style={{ padding: '20px' }}>
                <Formik
                  initialValues={{ new_password: '', confirm_password: '' }}
                  validationSchema={Yup.object({
                    new_password: Yup.string().min(8, 'Username have 8 character or more').required('This Field Require'),
                    confirm_password: Yup.string().oneOf([Yup.ref('new_password')], 'Confirm Password Not Match').required('This Field Require')
                  })}
                  onSubmit={async (values) => {
                    try {
                      const response = await submitData('/change-password?code='+params.verify, values)
                      console.log(response)
                      if (response.data && response.data.success) {
                        setOpenDialog(1)
                      } else {
                        setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                      }
                    } catch (e) {
                      console.log(e)
                      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                    }
                  }
                  }
                >
                  <Form>
                    <CustomTextField fullWidth margin='normal' label='New Password' type='password' name='new_password' variant='outlined' component={TextField} />
                    <CustomTextField fullWidth margin='normal' label='Confirm Password' type='password' name='confirm_password' variant='outlined' component={TextField} />
                    <Button variant='contained' color='primary' fullWidth type='submit' style={{textTransform:'capitalize'}}>Reset Password</Button>
                  </Form>
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </>)}
        </MuiThemeProvider>
    </>
  )
}

export default ForgotPassword