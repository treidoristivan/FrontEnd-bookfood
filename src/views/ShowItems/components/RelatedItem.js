import React from 'react'
import { Link } from 'react-router-dom'
import {
  CardContent, Card, Avatar,
  Grid, CardActions,
  Typography, Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  avatar: {
    height: '100px',
    width: '100px'
  }
})

export default function RelatedItem (props) {
  const classes = useStyles()
  return (
    <Card align='center' elevation={6} style={{ paddingTop: '20px' }}>
      <Avatar variant='rounded' alt={props.name} src={(process.env.REACT_APP_API_URL + '/' + props.images)} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant='subtite1' color='textSecondary'>
          {props.name}
        </Typography>
        <Typography gutterBottom variant='h6' color='secondary'>
          Rp. {parseFloat(props.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions style={{ marginTop: '-15px' }}>
        <Grid container justify='center'>
          <Button size='small' color='primary' variant='contained' to={`/items/${props._id}`} component={Link}>
            Details
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}
