import React from 'react'
import { Container, CircularProgress, Grid, Typography, Button } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

export default function CheckoutDone (props) {
  let success
  const handleClick = (step) => (e) => {
    props.setActiveStep(step)
  }
  const displayText = (status) => {
    if (status) {
      clearTimeout(success)
      return (
        <>
        <MuiThemeProvider theme={theme}>
          <Typography variant='h5' align='center' style={{ marginBottom: '10px' }}>Congratulation Checkout Success</Typography>
          <Grid container justify='center'>
            <Button size='small' variant='contained' color='secondary' onClick={handleClick(0)}>Back</Button>
          </Grid>
          </MuiThemeProvider>
        </>)
    } else {
      success = setTimeout(() => {
        props.setActiveStep(3)
      }, 3000)
      return (<Typography variant='h5' align='center' style={{ marginBottom: '10px' }}><CircularProgress size={18} />&nbsp;&nbsp;Waiting for Payment</Typography>)
    }
  }
  return (
    <Grid container justify='center' component={Container}>
      <Grid item sm={10} md={8}>
        {displayText(props.status)}
      </Grid>
    </Grid>
  )
}
