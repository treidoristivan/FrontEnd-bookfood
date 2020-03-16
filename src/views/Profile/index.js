import React from 'react'
import {Link} from 'react-router-dom'
import {
  Grid, Container, TextField, Avatar, Typography, Button, Paper,
  List, ListItem, ListItemAvatar, ListItemText, ExpansionPanel, ExpansionPanelSummary,
  ExpansionPanelDetails, Card, CardContent, Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {Work} from '@material-ui/icons'
import CustomTextField from '../../components/CustomTextField'
import {Formik, Form } from 'formik'
import submitData from '../../helpers/submitData'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import getData from '../../helpers/getData'
const useStyles = makeStyles({
  paper: {
    padding: '30px',
    width:'100%',
  },
  avatar: {
    height: '140px',
    width: '140px'
  },
  balance:{
    backgroundColor:'#ffc400',
    color:'white',
    fontWeight:400,
    height:'50px',
    lineHeight:'50px',
    borderRadius:'15px'
  },
  expanded: {
    maxHeight:'350px',
    overflowX:'scroll',
    overflowY:'hidden'
  },
  editProfile: {
    position:'absolute',
    left:0,
    bottom:'20px',
    height:'190px',
    padding: '30px',
    width:'100%',
  }
})
export default function Profile (props) {
  const classes = useStyles()
  const [userData, setUserData] = React.useState({})
  const [userReview, setUserReviews] = React.useState([])
  const [expanded, setExpanded] = React.useState('')
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [statusEdit, setStatusEdit] = React.useState({
    profile:false,
    balance:false
  })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  React.useEffect(() => {
    getUserData()
  }, [statusEdit])
  const getUserData = async () => {
    try {
      const response = await getData('/profile')
      console.log(response)
      setUserData(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const getReviews = async () => {
    try {
      const response = await getData('/reviews?sort[created_at]=1')
      console.log(response)
      setUserReviews(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Container style={{ marginTop:'150px'}}>
        <Grid container justify='space-between' spacing={2}>
          <Grid item sm={5} md={4} style={{position:'relative'}}>
            <Paper className={classes.paper} elevation={3}>
              <Grid container justify='center'>
                <Avatar alt={userData.username} src={`${process.env.REACT_APP_API_URL}/${userData.picture}`} className={classes.avatar} />
              </Grid>
              <Typography gutterBottom variant='h6' color='textSecondary' align='center' style={{marginTop:'15px'}}>
                {userData.username}
              </Typography>
              <Typography gutterBottom variant='h5' align='center'>
                {userData.fullname ? userData.fullname : userData.email}
              </Typography>
              <Typography gutterBottom variant='h6' align='center' className={classes.balance}>
                Wallet : {userData.balance}
              </Typography>
              {/* <Typography gutterBottom variant='subtitle1' color='textSecondary' align='center'>
                Alamat : {userData.address? userData.address : 'Not Set'}
              </Typography> */}
              {/* <Typography gutterBottom variant='h6' color='textSecondary' align='center' style={{marginTop:'30px', marginBottom:'20px'}}>
                  Tambah Saldo
              </Typography> */}
              <Formik
                initialValues={{nominal_topup:0}}
                validationSchema={Yup.object({nominal_topup:Yup.number().required()})}
                onSubmit={async (values,form) => {
                  console.log(values)
                  setStatusEdit({balance:true})
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
                  setStatusEdit({balance:false})
                }}
              >
                <Form>
                  <Grid container spacing={3} justify='flex-end' alignItems='center'>
                    <Grid item xs={5}>
                      <CustomTextField type='number' name='nominal_topup' label='Nominal Top Up' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={4}>
                      <Button size='small' type='submit' color='primary' variant='outlined' width='100%'>
                        Add Wallet
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Paper>
            <Paper elevation={0} className={classes.editProfile} hidden={!statusEdit.profile}>
              <Formik
                initialValues={{fullname:'', email:'', gender:'', alamat:'',picture:''}}
                validationSchema={Yup.object({fullname: Yup.string(),email:Yup.string().email(),gender:Yup.string(), alamat:Yup.string(),picture:Yup.string()})}
                // onSubmit={async (values,form) => {
                //   setStatusEdit({balance:true})
                //   try {
                //     const response = await submitData('/carts', values)
                //     if (response.data.success) {
                //       setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                //       form.setSubmitting(false)
                //       form.resetForm()
                //     }
                //     setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                //   } catch (e) {
                //     console.log(e)
                //     setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                //   }
                //   setStatusEdit({balance:false})
                // }}
              >
                <Form>
                  <Grid container spacing={3} justify='center' alignItems='center' >
                    <Grid item xs={5}>
                      <CustomTextField type='text' name='fullname' label='Full Name' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={5}>
                      <CustomTextField type='text' name='email' label='E-Mail' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={5}>
                      <CustomTextField type='text' name='gender' label='Gender' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={5}>
                      <CustomTextField type='text' name='alamat' label='Alamat' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={4} container justify='center'>
                      <Button size='small' color='primary' variant='outlined' width='100%'>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Paper>
          </Grid>
          <Grid item sm={6} md={6} elevation={3}>
            {/* <Typography gutterBottom variant='h6' color='textPrimary' align='center' style={{marginTop:'30px', marginBottom:'20px'}}>
              Special Application
            </Typography>
            <Grid container justify='center'>
              <Button size='small' color='primary' variant='outlined  ' width='100%' to='/carts' component={Link}>
                See Cart
              </Button>
            </Grid> */}
            <List>
              <ExpansionPanelSummary onClick={() => {setStatusEdit({ profile: !statusEdit.profile })}}>
                <ListItem>
                  <ListItemAvatar> 
                    <Avatar>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Edit Profile'/>
                </ListItem>
              </ExpansionPanelSummary>
              <ExpansionPanel expanded={expanded === 'reviewItem'} onChange={handleChange('reviewItem')} onClick={getReviews}>
                <ExpansionPanelSummary>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText primary='Recently Review Item'/> */}
                  </ListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={ classes.expanded }>
                  {
                    userReview.map((review)=>(
                      <Card key={review._id} style={{margin:'5px'}}>
                        <CardContent>
                          <Typography variant='body1' component='h2'>
                            Review on <strong>{review.name}</strong>
                          </Typography>
                          <Typography color='textSecondary' varianat='p' gutterBottom>
                            at {new Date(review.created_at).toDateString()}
                          </Typography>
                          <Typography className={classes.pos} component='p' color='textSecondary'>
                            Rating {review.rating}
                          </Typography>
                          <Typography variant='body2' component='p'>
                            {review.review}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
