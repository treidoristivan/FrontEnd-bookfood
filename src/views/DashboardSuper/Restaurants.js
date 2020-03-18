import React from 'react'
import {
  Snackbar, IconButton, Dialog, Grid, Typography, Slide
} from '@material-ui/core'
import { Alert, SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons'
import FormRestaurants from './components/FormRestaurants'
import ListRestarants from './components/ListRestaurants'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />;
})

export default function Items (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [openForm, setOpenForm] = React.useState(0)
  const [initialValues, setInitialValues] = React.useState({ id: 0, id_owner: '', name: '', logo: null, address: '', description: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  const handleOpenForm = () => {
    setOpenForm(1)
  }
  const handleCloseForm = () => {
    setOpenForm(0)
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
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
            {!initialValues.id ? 'Add Restaurant' : 'Update Restaurant'}
          </Typography>
        </Grid>
        <FormRestaurants
          setMsg={setMsg}
          update={initialValues.id}
          handleCloseForm={handleCloseForm}
          initialValues={initialValues}
          setInitialFormItem={setInitialValues}
        />
      </Dialog>
      <ListRestarants
        setMsg={setMsg}
        msg={msg}
        handleOpenForm={handleOpenForm}
        setInitialValues={setInitialValues}
      />
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
