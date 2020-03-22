import React from 'react'
import FormCategories from './components/FormCategories'
import {
  Snackbar, Button, Dialog, DialogContent, DialogActions, Typography,
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Alert, SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import ListCategories from './components/ListCategories'

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


export default function Categories (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [openForm, setOpenForm] = React.useState(0)
  const [initialValues, setInitialValues] = React.useState({
    id: 0,
    name: ''
  })
  const handleOpenForm = () => {
    setOpenForm(1)
  }
  const handleCloseForm = () => {
    setOpenForm(0)
  }
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
          <MuiThemeProvider theme={theme}>

      <Typography color='primary' variant='h5' align='center' style={{marginBottom:'20px'}}>Categories</Typography>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <ListCategories
        setMsg={setMsg}
        handleOpenForm={handleOpenForm}
        setInitialValues={setInitialValues}
      />
      <Dialog
        open={openForm}
        maxWidth='md'
        fullWidth='lg'
        onClose={handleCloseForm}
      >
        <DialogContent>
          <FormCategories
            setMsg={setMsg}
            update={initialValues.id}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            handleCloseForm={handleCloseForm}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleCloseForm}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <SpeedDial
        style={{ position: 'fixed', bottom: '80px', right: '40px' }}
        ariaLabel='new Item'
        icon={<SpeedDialIcon />}
        onClick={handleOpenForm}
        open={false}
      />
      </MuiThemeProvider>
    </>
  )
}
