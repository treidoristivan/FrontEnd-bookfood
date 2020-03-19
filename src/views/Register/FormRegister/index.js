import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, CardHeader, Button, CardMedia, CardActions, Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles'
import logo from '../../../assets/logo.png'
import * as Yup from 'yup'
import { Formik } from 'formik'
import submitData from '../../../helpers/submitData'
import FormRegister from './FormRegister'

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
    padding: '20px'
  },
  img: {
    width:'180px',
    height: '60px'
  }
})

const initialFormRegistrasi = {username: '', password: '', confirm_password: ''}
const msgRequired ='This is Required'
const validationFormRegistrasi = Yup.object({
  username: Yup.string().min(6, 'Username have 6 character or more')
    .required(msgRequired),
  password: Yup.string().min(8, 'Username have 8 character or more')
    .required(msgRequired),
  email: Yup.string().email('Invalid email address')
    .required(msgRequired),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password Not Match').required(msgRequired)
})

function LayoutRegister (props) {
  const [progres, setProgres] = React.useState(0)
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>

    <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
      <Grid item md={5} lg={4} sm={8}>
        <Card className={classes.containerForm} elevation={6}>
          <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} className={classes.img}/>} />
          <CardMedia>
            <Formik
              initialValues={initialFormRegistrasi}
              validationSchema={validationFormRegistrasi}
              onSubmit={async (values, form) => {
                try {
                  setProgres(1)
                  const response = await submitData('/register', values)
                  console.log(response)
                  if (response.data.success) {
                    form.setSubmitting(false)
                    form.resetForm()
                    props.setSuccessRegister(1)
                  }
                  props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                } catch (e) {
                  setProgres(0)
                  console.log(e)
                  props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                }
              }}
            > 
              <FormRegister progres={progres}/>
            </Formik>
          </CardMedia>
          <CardActions >
            <Typography variant='p' color='textSecondary'>Already have Account?</Typography>
            <Button size='medium' variant='contained' color='primary' to='/login' component={Link}>
              Sign In
            </Button>
          </CardActions>
        </Card>
      </Grid>

    </Grid>
    </MuiThemeProvider>

  )
}
export default LayoutRegister
