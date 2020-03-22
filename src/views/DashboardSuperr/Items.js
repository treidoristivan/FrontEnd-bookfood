import React from 'react'
import {
  Slide, Snackbar, Dialog, Grid, Typography, IconButton
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons'
import { Alert, SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import FormItem from './components/FormItem'
import ListItem from './components/ListItem'

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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />;
})
export default function Items (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [initialValue, setInitialValue] = React.useState({
    id: 0, id_restaurant: '', id_category: '', name: '', quantity: 0, price: 0, description: '', images: null 
  })
  const [openForm, setOpenForm] = React.useState(false)

  const handleClickOpenForm = () => {
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
  }

  const handleClose = () => {
    setMsg({ display: 0, success: false, message: '' })
  }
  var showMessage = (dataMsg) => {
    setMsg({ display: 1, success: dataMsg.success, message: dataMsg.msg })
  }
  return (
    <>
              <MuiThemeProvider theme={theme}>
       <Typography variant='h5' align='center' style={{marginBottom:'20px'}}>Items</Typography>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
        <Alert variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Dialog fullScreen open={openForm} onClose={handleCloseForm} TransitionComponent={Transition}>
        <Grid container style={{ marginTop: '80px', paddingRight: '60px' }} justify='flex-end'>
          <IconButton onClick={handleCloseForm}>
            <CloseIcon style={{ height: '30px', width: '30px'}} color='secondary'/>
          </IconButton>
        </Grid>
        <Grid container alignItems='center' justify='center'>
          <Typography variant='h5'>
            {!initialValue.id ? 'Adding Item' : 'Update Item'}
          </Typography>
        </Grid>
        <FormItem
          initialValue={initialValue}
          update={initialValue.id}
          showMessage={showMessage}
          setInitialValue={setInitialValue}
          handleCloseForm={handleCloseForm}
        />
      </Dialog>
      <ListItem showMessage={showMessage} handleClickOpenForm={handleClickOpenForm} setInitialValue={setInitialValue} />
      <SpeedDial
        style={{ position: 'fixed', bottom: '80px', right: '40px' }}
        ariaLabel='new Item'
        icon={<SpeedDialIcon />}
        onClick={handleClickOpenForm}
        open={false}
      />
</MuiThemeProvider>
    </>
  )
}
