import React from 'react'
import {
  Grid, Card, CardHeader, CardContent, CardActions, MenuItem, Button, TextField
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
import getData from '../../../helpers/getData'
import submitData from '../../../helpers/submitData'
import patchData from '../../../helpers/patchData'

const msgRequired = 'This is Required'
const validationCreate = Yup.object({
  id_owner: Yup.number().required(msgRequired),
  name: Yup.string().required(msgRequired),
  logo: Yup.mixed(),
  address: Yup.string().required(msgRequired),
  description: Yup.string()
})
const validationUpdate = Yup.object({
  id_owner: Yup.number().nullable(),
  name: Yup.string().nullable(),
  logo: Yup.mixed().nullable(),
  address: Yup.string().nullable(),
  description: Yup.string().nullable()
})
export default function FormItem (props) {
  const { update, initialValues, setInitialFormItem, handleCloseForm, setMsg } = props
  const [users, setUsers] = React.useState([])
  const getUsers = async () => {
    try {
      const response = await getData('/users')
      if (response.data.success && response.data.data) {
        setUsers(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getUsers()
  }, [])
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={!update ? validationCreate : validationUpdate}
      onSubmit={async (values, form) => {
        try {
          let response
          const formData = new FormData ()
          if (!update) {
            Object.keys(values).forEach(v => {
              formData.append(v, values[v])
            })
            response = await submitData('/restaurants', formData)
          } else {
            Object.keys(values).filter(v => initialValues[v] !== values[v]).forEach(v => {
              formData.append(v, values[v])
            })
            response = await patchData(`/restaurants/${update}`, formData)
          }

          if (response.data.success) {
            setMsg({ display: 1, success: response.data.success, message: response.data.msg })
            setInitialFormItem({ id: 0, id_owner: '', name: '', logo: null, address: '', description: '' })
            handleCloseForm()
            form.setSubmitting(false)
            form.resetForm()
          }
          setMsg({ display: 1, success: response.data.success, message: response.data.msg })
        } catch (e) {
          console.log(e)
          setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
        }
      }}
    >
      <Form>
        <Card elevation={0}>
          <CardContent>
            <Grid container justify='center'>
              <Grid container sm={8} item spacing={2}>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField} fullWidth label='Owner' margin='dense'
                    name='id_owner' select variant='outlined'
                  >
                    {
                      users.map(v => (
                        <MenuItem key={v._id} value={v._id}>
                          {v.username}
                        </MenuItem>
                      ))
                    }
                  </CustomTextField>
                </Grid>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField}
                    fullWidth label='Name' margin='dense' name='name' type='text' required variant='outlined'
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <Field
                    component={({ field, form, ...props }) => (
                      <TextField
                        fullWidth label='Logo' margin='dense' name='logo' type='file' onChange={(event) => {
                          form.setFieldValue('logo', event.currentTarget.files[0])
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField}
                    fullWidth label='Address' margin='dense' name='address' type='text' required variant='outlined'
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField}
                    multiline
                    rows={2}
                    fullWidth label='Description' margin='dense' name='description' type='text' variant='outlined'
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify='center'>
              <Button color='primary' variant='contained' type='submit'>
                {!update ? 'Add Restaurant' : 'Update Restaurant'}
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </Formik>
  )
}
