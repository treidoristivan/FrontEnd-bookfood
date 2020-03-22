import React from 'react'
import {
  Paper, Grid, Avatar, Typography, Button, makeStyles, TextField
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import submitData from '../../../helpers/submitData'
import CustomTextField from '../../../components/CustomTextField'

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
 
  avatar: {
    padding:'20px',
    height: '300px',
    width: '400px',
    left:'25%'
  },
  balance: {
    color: '#008080',
    fontWeight: 600,
    height: '50px',
    lineHeight: '50px',
    borderRadius: '15px'
  },
 
  edit: {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
    
    }
})
export default function CardProfile (props) {
  const { userPic, userData, statusEdit, setStatusEdit, setMsg } = props
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>





<Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={4}>
          <Button className={classes.edit} color='primary' variant='contained' onClick={() => { setStatusEdit({ profile: !statusEdit.profile }) }}>< EditOutlinedIcon/> Edit</Button>
          <Avatar variant='rounded' alt={userData.username} src={userPic ? userPic : `${process.env.REACT_APP_API_BASE_URL}/${userData.picture}`} className={classes.avatar} />
          
          <Typography gutterBottom variant='h5' align='center'>
            {userData.fullname ? userData.fullname : userData.email}
          </Typography>
          </Paper>
        </Grid>


        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4}>
          <Typography gutterBottom variant='h6' color='textSecondary' align='center' >
          Username : 
          </Typography>
          <Typography gutterBottom variant='subtitle1'  color='textSecondary' align='center' >
         {userData.username}
          </Typography>
          <Typography gutterBottom variant='h6' color='textSecondary' align='center'>
            Address : 
          </Typography>
          <Typography gutterBottom variant='subtitle1' color='textSecondary' align='center'>
            {userData.address ? userData.address : 'Not Set'}
          </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4}  >
          <Typography gutterBottom variant='h5' align='center' className={classes.balance}>
          Saldo : {userData.balance}
          </Typography>
         
      
      
      
      <Formik
          initialValues={{ nominal_topup: 0 }}
          validationSchema={Yup.object({ nominal_topup: Yup.number().required() })}
          onSubmit={async (values, form) => {
            setStatusEdit({ balance: true })
            try {
              const response = await submitData('/topup', values)
              if (response.data.success) {
                setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                form.setSubmitting(false)
                form.resetForm()
              }
              setMsg({ display: 1, success: response.data.success, message: response.data.msg })
            } catch (e) {
              console.log(e.response)
              setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
            }
            setStatusEdit({ balance: false })
          }}
      >
        <Form>
          <Grid container spacing={3} justify='flex-end' alignItems='center'>
            <Grid item xs={5}>
              <CustomTextField type='number' name='nominal_topup' label='Nominal Top Up' variant='outlined' size='small' component={TextField} />
            </Grid>
            <Grid item xs={4}>
              <Button size='small' type='submit' color='secondary' variant='contained' width='100%'>
                TopUp
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
          </Paper>
        </Grid>
</Grid>
      </MuiThemeProvider>
  )
}
