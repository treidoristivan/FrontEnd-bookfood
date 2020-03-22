import React from 'react'
import {
  Paper, Grid, Avatar, Typography, Button, makeStyles, TextField, IconButton, Box
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Image } from '@material-ui/icons'
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
  paper: {
    padding: '20px',
    marginBottom: '40px'
  },
  avatar: {
    height: '180px',
    width: '80%'
  },
  balance: {
    color: '#008080',
    fontWeight: 600,
    height: '50px',
    lineHeight: '50px',
    borderRadius: '15px'
  },
  iconEditPic: {
    position: 'absolute',
    top: '23%',
    bottom: '25%',
    left: '81%',
    
  },
  edit: {
    position: 'absolute',
    top: '38%',
    left: '80%',
    
    }
})
export default function CardProfile (props) {
  const { userPic, userData, statusEdit, setStatusEdit, setMsg } = props
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>

    <Paper className={classes.paper} elevation={3}>
      <Button className={classes.edit} color='primary' onClick={() => { setStatusEdit({ profile: !statusEdit.profile }) }}>< EditOutlinedIcon/> Edit</Button>
      <Grid  container  justify='center' >
        <Avatar variant='rounded' alt={userData.username} src={userPic ? userPic : `${process.env.REACT_APP_API_BASE_URL}/${userData.picture}`} className={classes.avatar} />
        <Box className={classes.iconEditPic} hidden={!statusEdit.profile}>
          <IconButton component='label' for='userProfileField' style={{ backgroundColor: 'rgba(255, 255, 255,.7)' }}><Image style={{ height: '25px', width: '25px', color: '#ffcc00' }} /></IconButton>
        </Box>
      </Grid>
      <Typography gutterBottom variant='h6' color='textSecondary' align='center' style={{ marginTop: '15px' }}>
        {userData.username}
      </Typography>
      <Typography gutterBottom variant='h5' align='center'>
        {userData.fullname ? userData.fullname : userData.email}
      </Typography>
      <Typography gutterBottom variant='h5' align='center' className={classes.balance}>
        Saldo : {userData.balance}
      </Typography>
      <Typography gutterBottom variant='subtitle1' color='textSecondary' align='center'>
        Address : {userData.address ? userData.address : 'Not Set'}
      </Typography>
      <Typography gutterBottom variant='h6' color='textSecondary' align='center' style={{ marginTop: '30px', marginBottom: '20px' }}>
          Top Up Saldo
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
    </MuiThemeProvider>
  )
}
