import React from 'react'
import { Link } from 'react-router-dom'
import {
  CardContent, Card, CardMedia, Avatar,
  Grid, CardActions,
  Typography, Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  avatar: {
    height: '90px',
    width: '90px'
  }
})

export default function RelatedItem (props) {
  const classes = useStyles()
  return (
    <Card align='center' elevation={6} style={{paddingTop:'10px'}}>
      <Avatar alt={props.name} src={(process.env.REACT_APP_API_URL + '/' + props.images)} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant='subtite1' color='textSecondary'>
          {props.name}
        </Typography>
        <Typography gutterBottom variant='h6'>
          Rp. {parseFloat(props.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions style={{ marginTop: '-15px'}}>
        <Grid container justify='center'>
          <Button size='small' color='primary' variant='outlined' to={`/items/${props._id}`} component={Link}>
            Details
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}