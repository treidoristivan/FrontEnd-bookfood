import React from 'react'
import Container from '@material-ui/core/Container'
import { Grid, Card, CardContent, Typography, Avatar } from '@material-ui/core'
import { Store, Fastfood, MonetizationOn, PeopleAlt } from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  avatar: {
    backgroundColor:'red',
    height:'56',
    width: '56'
  }
})
export default function Dashboard (props) {
  const classes = useStyles()
  return (
    <>
      <Grid container component={Container} justify='center' spacing={5}>
        <Grid item>
          <Card>
            <CardContent>
              <Grid
                container
                justify='space-between'
              >
                <Grid item>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                  >
                    Total Transacsition
                  </Typography>
                  <Typography variant='h4'>25 Transaction</Typography>
                  <Typography
                    variant='caption'
                  >
                  For Today
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <MonetizationOn />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid
                container
                justify='space-between'
              >
                <Grid item>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                  >
                    Total Items
                  </Typography>
                  <Typography variant='h4'>25 Items</Typography>
                  <Typography
                    variant='caption'
                  >
                  Until Today
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <Fastfood />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid
                container
                justify='space-between'
              >
                <Grid item>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                  >
                    Total Restaurants
                  </Typography>
                  <Typography variant='h4'>25 Restaurants</Typography>
                  <Typography
                    variant='caption'
                  >
                  Until Today
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <Store />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid
                container
                justify='space-between'
              >
                <Grid item>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                  >
                    Total Users
                  </Typography>
                  <Typography variant='h4'>25 Users</Typography>
                  <Typography
                    variant='caption'
                  >
                  Until Today
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <PeopleAlt />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
