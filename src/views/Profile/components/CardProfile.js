import React from 'react'
import {
  Paper, Grid, Avatar, Typography, Button, makeStyles, TextField, IconButton, Box
} from '@material-ui/core'
import { Edit, Image } from '@material-ui/icons'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import submitData from '../../../helpers/submitData'
import CustomTextField from '../../../components/CustomTextField'
const useStyles = makeStyles({
  paper: {
    padding: '20px'
  },
  avatar: {
    height: '140px',
    width: '140px'
  },
  balance: {
    backgroundColor: '#1891cc',
    color: 'white',
    fontWeight: 600,
    height: '50px',
    lineHeight: '50px',
    borderRadius: '15px'
  },
  iconEditPic: {
    position: 'absolute',
    top: '25%',
    bottom: '25%',
    left: '43%',
    right: '43%'
  }
})
export default function CardProfile (props) {
  const { userPic, userData, statusEdit, setStatusEdit, setMsg } = props
  const classes = useStyles()
  return (
    <Paper className={classes.paper} elevation={3}>
      <Button onClick={() => { setStatusEdit({ profile: !statusEdit.profile }) }}><Edit style={{ backgroundColor: '#f50057', padding: '10px', color: 'white' }} /></Button>
      <Grid container justify='center' style={{ position: 'relative' }}>
        <Avatar alt={userData.username} src={userPic ? userPic : `${process.env.REACT_APP_API_URL}/${userData.picture}`} className={classes.avatar} />
        <Box className={classes.iconEditPic} hidden={!statusEdit.profile}>
          <IconButton component='label' for='userProfileField' style={{ backgroundColor: 'rgba(0,0,0,.7)' }}><Image style={{ height: '40px', width: '40px', color: 'white' }} /></IconButton>
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
          Tambah Saldo
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
  )
}
