import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/styles'
import { Paper, Typography,Button} from '@material-ui/core'
import img1 from './assets/banner.jpg'
import logo from './assets/logo-copy.png'

import 'bootstrap/dist/css/bootstrap.css';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
    left:'0%'
  },
  btn: {
    color: '#ffc400',
    fontWeight:800,
    backgroundColor:'#ffc400s',
    boxShadow: '0px 1px 8px #ffcc00'

  },
  i:{
    fontSize:40,
    color:'#ffcc00'
  },
  h2: {
    fontSize:65,
    color: '#008080'
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
    <>
    <Paper elevation={0} className={classes.imageContainer}>
      <img src={props.item.img} className={classes.image} />
      <div className={classes.itemDescription}>
      <img alt='logo' src={logo}/>
      <Typography className={classes.i}>Welcome To Our Kitchen!</Typography>
      <Typography className={classes.h2}>Delivery More Delicious</Typography>
      <Button variant='contained' color='primary'className={classes.btn}  to='/items' component={Link}>Ready To Order</Button>
      </div>
    </Paper>

     {/* Home How it work section */}
     <div className="container-fluid text-center py-4">
          <div className="py-4">
            <h2 className="h2 text-uppercase">How It Works</h2>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Restaurant" src={require("./assets/how-to-work2.png")} />
                </span>
                <h3 className="h3 mb-4">Choose A Restaurant</h3>
                <p className="mb-4">Cras vitae dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Tasty Dish" src={require("./assets/how-to-work3.png")} />
                </span>
                <h3 className="h3 mb-4">Choose A Tasty Dish</h3>
                <p className="mb-4">Dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Pick Up Or Delivery" src={require("./assets/how-to-work1.png")} />
                </span>
                <h3 className="h3 mb-4">Pick Up Or Delivery</h3>
                <p className="mb-4">Purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Order now section */}
        <div className="container-fluid text-center py-5 home-cont3">
          <p className="h1 text-uppercase text-white mt-5 mb-3">Just Order And We Will Deliver You</p>
          <p className="text-white mb-3">Pellentesque eget justo eget nibh luctus semper at ut tellus.</p>
          <button type="button" className="btn btn-warning text-uppercase mb-5" onClick={() => this.handleOrderNowBtn()}><b>Order Now</b></button>
        </div>

        {/* Home Featured restaurant section */}
        <div className="container-fluid py-5">
          <div className="py-4">
            <h2 className="h2 text-uppercase text-center">Featured Restaurant</h2>
            <p className="text-center">Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Natural Healthy Food" src={require("./assets/listing-logo03.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Natural Healthy Food</h5>
                      <p className="mb-2"><small>Apple Juice, Beef Roast, Cheese Burger</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Menu & Drinks" src={require("./assets/listing-logo09.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Menu &amp; Drinks</h5>
                      <p className="mb-2"><small>Chicken Roast, Chines Soup, Cold Coffee</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(3) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Chefs" src={require("./assets/listing-logo12.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Chefs</h5>
                      <p className="mb-2"><small>Egg Fry, Noodles, Pastry</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Menu's" src={require("./assets/listing-logo15.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Menu's</h5>
                      <p className="mb-2"><small>Fish Fry, Fresh Juice, Stakes</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Food N&H" src={require("./assets/2.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Food N&amp;H</h5>
                      <p className="mb-2"><small>Beef Roast, Cheese Burger, Doughnut</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(4) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Restaurant" src={require("./assets/listing-logo13.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Restaurant</h5>
                      <p className="mb-2"><small>Apple Juice, BB.Q</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(2) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default Header
