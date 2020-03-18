import React from 'react'
import CardProfile from './components/CardProfile'
import CardEditProfile from './components/CardEditProfile'
import { Link } from 'react-router-dom'
import {
  Grid, Container, Avatar, Typography, Button,
  List, ListItem, ListItemAvatar, ListItemText, ExpansionPanel, ExpansionPanelSummary,
  ExpansionPanelDetails, Card, CardContent, Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Work } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import getData from '../../helpers/getData'

const useStyles = makeStyles({
  expanded: {
    maxHeight: '350px',
    overflowX: 'scroll',
    overflowY: 'hidden'
  }
})
export default function Profile (props) {
  const classes = useStyles()
  const [userData, setUserData] = React.useState({})
  const [userPic, setUserPic] = React.useState('')
  const [userReview, setUserReviews] = React.useState([])
  const [expanded, setExpanded] = React.useState('')
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [statusEdit, setStatusEdit] = React.useState({
    profile: false,
    balance: false
  })

  const handleClose = () => {
    setMsg({ display: 0 })
  }

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

  React.useEffect(() => {
    getUserData()
  }, [statusEdit, userPic])
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Container style={{ marginTop: '50px' }}>
        <Grid container justify='space-between' spacing={2}>
          <Grid item xs={12} sm={6} md={5} style={{ position: 'relative', overflow: 'hidden' }}>
            <CardProfile userPic={userPic} userData={userData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
            <CardEditProfile setUserPic={setUserPic} userData={userData} setUserData={setUserData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
          </Grid>
          <Grid item sm={6} md={6} elevation={3}>
            <Typography gutterBottom variant='h6' color='textPrimary' align='center' style={{ marginTop: '30px', marginBottom: '20px' }}>
              Special Application
            </Typography>
            <Grid container justify='center'>
              <Button size='small' color='secondary' variant='contained' to='/carts' component={Link} style={{ margin: '2px' }}>
                See Cart
              </Button>
              {
                userData.is_admin ? (
                  <Button size='small' color='secondary' variant='contained' to='/restaurant/admin' component={Link} style={{ margin: '2px' }}>
                    Dashboard Admin Restaurant
                  </Button>
                ) : ''
              }
              {
                userData.is_superadmin ? (
                  <Button size='small' color='secondary' variant='contained' to='/admin' component={Link} style={{ margin: '2px' }}>
                    Dashboard Super Admin
                  </Button>
                ) : ''
              }
            </Grid>
            <List>
              <ExpansionPanel expanded={expanded === 'reviewItem'} onChange={handleChange('reviewItem')} onClick={getReviews}>
                <ExpansionPanelSummary>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='Recently Review Item' />
                  </ListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expanded}>
                  {userReview && userReview.map((review) => (
                    <Card key={review._id} style={{ margin: '5px' }}>
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
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
