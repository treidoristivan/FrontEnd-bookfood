import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

export default function CardItem (props) {
  const [elevation, setElevation] = React.useState(1)
  const handleHover = (e) => {
    setElevation(6)
  }
  const handleLeave = (e) => {
    setElevation(1)
  }
  return (
    <Card elevation={elevation} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={props.detailItem.name}
          image={process.env.REACT_APP_API_BASE_URL + '/' + props.detailItem.images}
          height={150}
          title={props.detailItem.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' color='textPrimary'>
            {props.detailItem.name}
          </Typography>
          <Typography gutterBottom variant='h5'>
            Rp. {parseFloat(props.detailItem.price).toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' variant='outlined' width='100%' to={`/items/${props.detailItem._id}`} component={Link}>
          Details
        </Button>
      </CardActions>
    </Card>
  )
}
