import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  avatar: {
    height: '100px',
    width: '100px',
   
  }
})

  const handleHover = (e) => {
    setElevation(4)
  }
  const handleLeave = (e) => {
    setElevation(1)
  }
  return (
    <Card align='center' style={{ padding: '10px' }} elevation={elevation} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <Avatar variant='rounded' alt={props.detailItem.name} src={process.env.REACT_APP_API_URL + '/' + props.detailItem.images} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant='subtite1' color='primary'>
          {props.detailItem.name}
        </Typography>
        <Typography gutterBottom variant='h6'>
          Rp. {parseFloat(props.detailItem.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size='small' color='secondary' variant='contained'>
          <AddShoppingCart />
        </Button> */}
        <Button size='small' color='primary' variant='contained' to={`/items/${props.detailItem._id}`} component={Link}>
        Details
        </Button>
      </CardActions>
    </Card>
  )
}
