import React from 'react'
import LayoutRegister from './FormRegister'
import FormVerify from './FormVerify'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function Register (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [successRegister, setSuccessRegister] = React.useState(0)
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      {
        !successRegister ? <LayoutRegister setSuccessRegister={setSuccessRegister} setMsg={setMsg} /> : <FormVerify setMsg={setMsg} />
      }
    </>
  )
}

export default Register
