import React from 'react'
import {
  Paper, Grid, Button, TextField, MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
import pacthData from '../../../helpers/patchData'
const useStyles = makeStyles({
  editProfile: {
    position: 'absolute',
    paddingTop: '20px',
    left: '20px',
    top: '42%',
    right: '20px',
    bottom: '80px'
  }
})

export default function CardEditProfile (props) {
  const classes = useStyles()
  const { userData, setUserPic, statusEdit, setMsg, setStatusEdit } = props
  return (
    <Paper elevation={0} className={classes.editProfile} hidden={!statusEdit.profile}>
      <Formik
        enableReinitialize
        initialValues={userData}
        validationSchema={Yup.object({
          fullname: Yup.string().nullable(),
          email: Yup.string().email().nullable(),
          gender: Yup.string().oneOf(['male', 'female'], 'Select male Or Female').nullable(),
          address: Yup.string().nullable(),
          picture: Yup.mixed().nullable()
        })}
        onSubmit={async (values, form) => {
          setStatusEdit({ profile: true })
          try {
            const formData = new FormData()
            Object.keys(values).filter(v => userData[v] !== values[v]).forEach(v => {
              formData.append(v, values[v])
            })
            const response = await pacthData('/profile', formData)
            setMsg({ display: 1, success: response.data.success, message: response.data.msg })
          } catch (e) {
            console.log(e)
            setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
          }
          setStatusEdit({ profile: false })
        }}
      >
        <Form>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs={5}>
              <CustomTextField type='text' name='fullname' label='Full Name' variant='outlined' size='small' component={TextField} />
            </Grid>
            <Grid item xs={5}>
              <CustomTextField type='text' name='email' label='E-Mail' variant='outlined' size='small' component={TextField} />
            </Grid>
            <Grid item xs={5}>
              <CustomTextField component={TextField} fullWidth label='Gender' margin='dense' name='gender' select variant='outlined'>
                {
                  [{ label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }].map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
            <Grid item xs={5}>
              <CustomTextField type='text' name='address' label='Address' variant='outlined' size='small' component={TextField} />
            </Grid>
            <div style={{ display: 'none' }}>
              <Field
                component={({ field, form, ...props }) => (
                  <TextField
                    fullWidth label='Images' margin='dense' name='picture' id='userProfileField' type='file' onChange={(event) => {
                      form.setFieldValue('picture', event.currentTarget.files[0])
                      setUserPic(URL.createObjectURL(event.currentTarget.files[0]))
                      console.log(userData)
                    }}
                  />
                )}
              />
            </div>
            <Grid item xs={4} container justify='center'>
              <Button size='small' color='secondary' variant='contained' width='100%' type='submit'>
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Paper>
  )
}
