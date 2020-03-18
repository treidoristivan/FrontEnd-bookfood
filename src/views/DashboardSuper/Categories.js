import React from 'react'
import FormCategories from './components/FormCategories'
import {
  Snackbar, Button, Dialog, DialogContent, DialogActions
} from '@material-ui/core'
import { Alert, SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import ListCategories from './components/ListCategories'

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
    </>
  )
}
