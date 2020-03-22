import React from 'react'
import {
  Container, Stepper, Step, StepLabel,
  Typography, Snackbar
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab'
import CartItems from './components/CartItems'
import CheckoutDetails from './components/CheckoutDetails'
import CheckoutDone from './components/CheckoutDone'
import { connect } from 'react-redux'
import { getCart } from '../../store/actions'

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

function getStepContent (page, setActiveStep, data, setMsg) {
  switch (page) {
    case 0:
      return (<CartItems setActiveStep={setActiveStep} data={data} style={{ marginBotton: '40px' }} setMsg={setMsg} />)
    case 1:
      return (<CheckoutDetails setActiveStep={setActiveStep} data={data} style={{ marginBotton: '40px' }} setMsg={setMsg} />)
    case 2:
      return (<CheckoutDone setActiveStep={setActiveStep} status={0} style={{ marginBotton: '40px' }} setMsg={setMsg} />)
    case 3:
      return (<CheckoutDone setActiveStep={setActiveStep} status={1} style={{ marginBotton: '40px' }} setMsg={setMsg} />)
    default:
      return 'Unknown Page'
  }
}
function ShowCarts (props) {
  const {dataCart, getCart} = props
  const [activeStep, setActiveStep] = React.useState(0)
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  // const getCartData = async () => {
  //   try {
  //     const response = await getData('/carts?sort[created_at]=1')
  //     setDataCart(response.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  React.useEffect(() => {
    getCart()
  }, [activeStep, msg])
  return (
    <>
         <MuiThemeProvider theme={theme}>

      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <div style={{ margin: '50px 0', paddingBottom: '10px', borderBottom: '0.2px solid #ccc' }}>
        <Container maxWidth='sm'>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>
                <Typography color='primary'><strong>Cart Items</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='primary'><strong>Cart Details</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='primary'><strong>Cart Chekout</strong></Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Container>
      </div>
      {getStepContent(activeStep, setActiveStep, dataCart, setMsg)}
      </MuiThemeProvider>
    </>
  )
}

const mapStateToProps = (state) => ({
  dataCart: state.dataCart
})
const mapDispatchToProps = {
  getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCarts)

