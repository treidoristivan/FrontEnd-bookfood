import React from 'react'
import { Container, Grid, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core'

export default function CheckoutDetails (props) {
  const handleClick = (step) => (e) => {
    props.setActiveStep(step)
  }
  console.log('ads')
  console.log(props)
  const [detailCheckout, setDetailCheckout] = React.useState({})
  React.useEffect(() => {
    setDetailCheckout(props.data.data)
    console.log(detailCheckout)
  },[props])
  return (
    <Grid container justify='center' component={Container}>
      <Grid item sm={10} md={8}>
        <Card>
          <CardContent>
            <Typography variant='h5' align='center' style={{marginBottom:'10px'}}>Details Purchase</Typography>
            <Typography align='center'>
              Total Price: { detailCheckout.totalPrice }
            </Typography>
            <Typography align='center'>
              Total Type Items: { detailCheckout.totalTypeItems }
            </Typography>
          </CardContent>
          <CardActions>
            <div style={{flexGrow:1}} />
            <Button size='small' variant='outlined' color='secondary' onClick={handleClick(0)}>Back</Button>
            <Button size='small' variant='contained' color='secondary' onClick={handleClick(2)}>Checkout</Button>
            <div style={{flexGrow:1}} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
} 