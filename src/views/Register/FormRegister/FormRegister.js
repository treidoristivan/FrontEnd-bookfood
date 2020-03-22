import React from 'react'
import { Button, TextField, CircularProgress, Grid } from '@material-ui/core'
import { Form } from 'formik'
import CustomTextField from '../../../components/CustomTextField'
function FormRegister (props) {
  const { progres } = props
  return (
    
    <Form>
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Username' name='username' variant='outlined' type='text'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='E-mail' name='email' variant='outlined' type='text'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Password' name='password' variant='outlined' type='password'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Confirm Password' name='confirm_password' variant='outlined' type='password'
      />
      <Button
        type='submit'
        size='large'
        fullWidth
        variant='contained'
        color='secondary'
      >
        <Grid component='span' hidden={progres === 0} >
          
          <CircularProgress size={25} color='secondary' />&nbsp;&nbsp;&nbsp;
        </Grid>
        <strong>Registrasi</strong>
      </Button>
    </Form>
    
  )
}
export default FormRegister
