import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/styles'
import { Paper, Typography,Button} from '@material-ui/core'
import img1 from './assets/makan.jpg'



const useStyles = makeStyles(() => ({
  
  imageContainer: {
    position: 'sticky',
    marginTop:'0px',
    marginBottom:'0px',
    marginLeft:'0px',
    marginRight:'0px',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '120%',
    position: 'center center'
  },
  Show: {
    position: 'absolute',
    top: '50px',
    bottom: '50px',
    zIndex: '99999999'
  },
  itemDescription: {
    position: 'absolute',
    top:'36%',
    fontWeight:800,
    padding:'20px',
    left:'30%'
  },
  btn: {
    color: '#ffc400',
    fontWeight:800,
    backgroundColor:'#ffc400s',
    boxShadow: '0px 1px 8px #ffc400'

  },
  i:{
    fontSize:40,
    color:'white'
  },
  h2: {
    fontSize:65,
    color: 'white'
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const items = [
    {
      img: img1
    }
  ]
  return (
    <Carousel indicators={0} autoPlay={1} className={classes.carousel}>
      {
        items.map((item, i) => (
          <Item item={item} key={i} />
        ))
      }
    </Carousel>
  )
}
function Item (props) {
  const classes = useStyles()
  return (
    <Paper elevation={0} className={classes.imageContainer}>
      <img src={props.item.img} className={classes.image} />
      <div className={classes.itemDescription}>
      <Typography className={classes.i}>Welcome To Our Kitchen!</Typography>
      <Typography className={classes.h2}>Delivery More Delicious</Typography>
      <Button variant='contained' color='primary'className={classes.btn}  to='/items' component={Link}>Ready To Order</Button>
      </div>
      

    </Paper>
  )
}

export default Header
