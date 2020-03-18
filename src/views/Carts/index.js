import React from 'react'
import {
  Container, Stepper, Step, StepLabel,
  Typography, Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CartItems from './components/CartItems'
import CheckoutDetails from './components/CheckoutDetails'
import CheckoutDone from './components/CheckoutDone'
import getData from '../../helpers/getData'

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
  const [activeStep, setActiveStep] = React.useState(0)
  const [dataCart, setDataCart] = React.useState({})
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  const getCartData = async () => {
    try {
      const response = await getData('/carts?sort[created_at]=1')
      setDataCart(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getCartData()
  }, [activeStep, msg])
  return (
    <>
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
                <Typography color='secondary'><strong>Cart Items</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='secondary'><strong>Checkout Details</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='secondary'><strong>Done</strong></Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Container>
      </div>
      {getStepContent(activeStep, setActiveStep, dataCart, setMsg)}
    </>
  )
}

export default ShowCarts
