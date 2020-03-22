import React from 'react'
import {
  Container, Grid, Typography, Card,
  CardContent, CardActions, Button
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import getData from '../../../helpers/getData'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc00'
      },
      secondary: {
        main: '#008080'
    }
  },  
});


export default function CheckoutDetails (props) {
  const { setMsg } = props
  const handleClick = (step) => (e) => {
    props.setActiveStep(step)
  }
  const handleCheckout = async () => {
    try {
      const response = await getData('/checkout')
      if (response.data.success) {
        handleClick(2)()
      }
      setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      console.log(e.response)
      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  const [detailCheckout, setDetailCheckout] = React.useState({})
  React.useEffect(() => {
    setDetailCheckout(props.data)
    console.log('Harga',detailCheckout)
  }, [props])
  return (
    <>
         <MuiThemeProvider theme={theme}>

      <Grid container justify='center' component={Container}>
        <Grid item sm={10} md={8}>
          <Card>
            <CardContent>
              <Typography variant='h5' align='center' style={{ marginBottom: '10px' }}>
                Cart Details Purchase
              </Typography>
              <Typography align='center'>
                Total Price: {detailCheckout ? detailCheckout.totalPrice:0} 
              </Typography>
              <Typography align='center'>
                Total Type Items: {detailCheckout ? detailCheckout.totalTypeItems:0}
              </Typography>
            </CardContent>
            <CardActions style={{ marginTop: 20, marginBottom: 30 }}>
              <div style={{ flexGrow: 1 }} />
              <Button size='small' variant='outlined' color='secondary' onClick={handleClick(0)}>Back</Button>
              <Button size='small' variant='contained' color='secondary' onClick={handleCheckout}>Checkout</Button>
              <div style={{ flexGrow: 1 }} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    </>
  )
}
