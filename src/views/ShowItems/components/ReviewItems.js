import React from 'react'

import {
  CardContent, Card, Avatar,
  Grid, Divider,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
  avatar: {
    height: '100px',
    width: '100px'
  }
})
export default function LayoutReviewItems (props) {
  const { dataReview } = props
  const classes = useStyles()
  return (
    <>
      {
        dataReview.map((review) => (
          <Grid item xs={6} sm={4} md={2} key={review._id}>
            <Card align='center' elevation={2} style={{ paddingTop: '20px' }}>
              <Avatar alt={review.username} src={(process.env.REACT_APP_API_URL + '/' + review.pictue)} className={classes.avatar} />
              <CardContent>
                <Typography gutterBottom variant='subtite1' color='textSecondary'>
                  {review.username}
                </Typography>
                <Divider />
                <div style={{ marginTop: '10px' }} />
                <Typography gutterBottom variant='subtite2'>
                  ( Rating {review.rating} )
                </Typography>
                <Typography paragraph>
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </>
  )
}
