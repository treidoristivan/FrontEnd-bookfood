import React from 'react'
import CardProfile from './components/CardProfile'
import CardEditProfile from './components/CardEditProfile'
import { Link } from 'react-router-dom'
import {
  Grid, Container, Paper, Typography, Button, Dialog, DialogContent, TextField, MenuItem,
  Tabs, Tab, Card, CardContent, CardHeader, CardActions, Snackbar, Hidden, Avatar, DialogActions, IconButton
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../components/CustomTextField'
import getData from '../../helpers/getData'
import submitData from '../../helpers/submitData'
import patchData from '../../helpers/patchData'
import deleteData from '../../helpers/deleteData'
import AlertDelete from '../../components/AlertDelete'
import { Alert } from '@material-ui/lab'
import TabPanel from '../../components/TabPanel'
import { CalendarToday } from '@material-ui/icons'
// import backgroundProfile from '../../assets/BackProfile.png'
import { connect } from 'react-redux'
import { setUserProfile } from '../../store/actions'

function Profile (props) {
  const { userData, setUserData } = props
  const [initialValuesR, setInitialValuesR] = React.useState({
    id_item: 0,
    rating: '',
    review: ''
  })
  const [updateId, setUpdateId] = React.useState(0)
  const [userPic, setUserPic] = React.useState('')
  const [userReview, setUserReviews] = React.useState([])
  const [userTransaction, setUserTransaction] = React.useState([])
  const [value, setValue] = React.useState(0)
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [openForm, setOpenForm] = React.useState(0)
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)
  const [statusEdit, setStatusEdit] = React.useState({
    profile: false,
    balance: false
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleClose = () => {
    setMsg(prevMsg =>({ ...prevMsg, display: 0 }))
  }
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const getUserData = async () => {
    try {
      const response = await getData('/profile')
      setUserData(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }

  const getReviews = async () => {
    try {
      const response = await getData('/reviews?sort[_id]=1&limit=100')
      setUserReviews(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const getHistory = async () => {
    try {
      const response = await getData('/history?limit=100')
      setUserTransaction(response.data.data.reverse())
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const createReview = (id) => {
    setInitialValuesR(prevState => ({ ...prevState, id_item: id }))
    setOpenForm(1)
  }
  const updateReview = async (id) => {
    try {
      const response = await getData('/reviews/'+id)
      console.log(response.data)
      setInitialValuesR(response.data.data)
      setUpdateId(id)
      setOpenForm(1)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteReview = async (id) => {
    try {
      console.log('al')
      const response = await deleteData(`/reviews/${id}`)
      console.log(response.data)
      setOpenDialogDelete(0)
      setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      console.log(e)
      console.log(e.response)
      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getUserData()
    getReviews()
    getHistory()
  }, [statusEdit, userPic, openForm, openDialogDelete])
  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteReview(deleteId)}
      />
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Container style={{ marginTop: '50px' }}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12} sm={9} md={5} component={Card} elevation={2} style={{ position: 'relative', overflow: 'hidden' }} >
            <CardProfile userPic={userPic} userData={userData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
            <CardEditProfile setUserPic={setUserPic} userData={userData} setUserData={setUserData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
          </Grid>
          <Hidden smDown>
            <Grid style={{ paddingLeft: '60px'}}>
              <Typography variant='h5' align='right' color='textSecondary'> We Try to</Typography>
              <Typography variant='h4' align='right' color='textSecondary' style={{ marginBottom: '20px' }}> Make You Life Easier</Typography>
              {/* <img alt='img' src={backgroundProfile} style={{ width: '350px' }} /> */}
            </Grid>
          </Hidden>
        </Grid>
        <Paper style={{ marginTop: '40px' }}>
          <Tabs
            indicatorColor='secondary'
            value={value}
            textColor='primary'
            onChange={handleChange}
            aria-label='disabled tabs example'
          >
            <Tab label='History Transaction' />
            <Tab label='Recently added Reviews' />
          </Tabs>
        </Paper>
        <Container>
          <TabPanel value={value} index={0}>
            {userTransaction && userTransaction.map((histransaction) => (
              <div key={histransaction._id}>
                <Paper style={{marginBottom:'10px', padding:'5px', paddingLeft:'20px'}}>
                  <Typography color='primary' component='p'>
                    <CalendarToday /> At {new Date(histransaction.created_at).toDateString()}
                  </Typography>
                  <Typography component='body1' color='textSecondary'>
                    Total Prices Rp. {histransaction.total_price}
                  </Typography>
                </Paper>
                <Grid item container justify='center' spacing={2}>
                  {
                    histransaction.listItem.map(v => (
                      <Grid key={v.id+'his'} item xs={6} sm={4} md={3}>
                        <Card align='center' elevation={1} style={{paddingTop:'20px'}}>
                          <Avatar style={{ height: '100px', width: '100px'}} alt={v.name} src={(process.env.REACT_APP_API_URL + '/' + v.images)}/>
                          <CardContent>
                            <Typography gutterBottom variant='h6' color='textSecondary'>
                              {v.name}
                            </Typography>
                          </CardContent>
                          <CardActions style={{ marginTop: '-15px' }}>
                            <Grid container justify='center'>
                              <Button size='small' color='primary' variant='contained' to={`/items/${v.id}`} component={Link}>
                                Order Again
                              </Button>&nbsp;&nbsp;
                              <Button size='small' color='primary' variant='outlined' onClick={() => createReview(v.id)}>
                                Create Review
                              </Button>
                            </Grid>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container justify='center' sytle={{ marginTop: '10px' }}>
              {userReview && userReview.map((review) => (
                <Grid item xs={6} sm={3} md={4} key={review._id}>
                  <Card style={{ margin: '5px' }}>
                    <CardContent>
                      <Typography variant='body1' component='h2'>
                        Review on <strong>{review.name}</strong>
                      </Typography>
                      <Typography color='textSecondary' varianat='p' gutterBottom>
                        at {new Date(review.created_at).toDateString()}
                      </Typography>
                      <Typography component='p' color='textSecondary'>
                        Rating {review.rating}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        {review.review}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container item justify='center'>
                        <IconButton onClick={ () => updateReview(review._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDialogDelete(review._id)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Container>
      </Container>
      <Dialog
        open={openForm}
        maxWidth='md'
        fullWidth='lg'
        onClose={() => setOpenForm(0)}
      >
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={initialValuesR}
            validationSchema={Yup.object({
              id_item: Yup.number().required('Field Required'),
              rating: Yup.number().oneOf([1, 2, 3, 4, 5], 'Rating Must in interval 1 -5 ').required('Field Required'),
              review: Yup.string().required('Field Required')
            })}
            onSubmit={async (values, form) => {
              try {
                let response
                if (!updateId) {
                  response = await submitData('/reviews', values)
                } else {
                  response = await patchData('/reviews/' + updateId, values)
                }
                if (response && response.data.success) {
                  setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                  setInitialValuesR({ id_item: 0, rating: '', review: '' })
                  setUpdateId(0)
                  form.setSubmitting(false)
                  form.resetForm()
                  setOpenForm(0)
                } else {
                  setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                }
              } catch (e) {
                console.log(e)
                console.log('err', e.response)
                setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
              }
            }}
          >
            <Form>
              <Card elevation={0}>
                <CardHeader title={!updateId ? 'Adding Review' : 'Update Review'} titleTypographyProps={{ variant: 'h5', align: 'center' }} />
                <CardContent>
                  <Grid container justify='center'>
                    <Grid item md={8} sm={10}>
                      <CustomTextField component={TextField} fullWidth label='Rating' margin='dense' name='rating' select variant='outlined'>
                        {
                          [1, 2, 3, 4, 5].map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>
                          ))
                        }
                      </CustomTextField>
                      <CustomTextField
                        component={TextField}
                        multiline
                        rows={4}
                        fullWidth label='Review' margin='dense' name='review' type='text' variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container justify='center'>
                    <Button color='primary' variant='contained' type='submit'>
                      {!updateId ? 'Add Review' : 'Update Review'}
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => setOpenForm(0)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps = (state) => ({
  userData: state.dataUser.dataProfile
})
const mapDispatchToProps = {
  setUserData: setUserProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
