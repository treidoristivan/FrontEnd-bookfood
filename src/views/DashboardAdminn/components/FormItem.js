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

const msgRequired = 'This is Required'

const validateCreate = Yup.object({
  id_restaurant: Yup.number().required(msgRequired),
  id_category: Yup.number().required(msgRequired),
  name: Yup.string().required(msgRequired),
  quantity: Yup.number().required(msgRequired),
  price: Yup.number().required(msgRequired),
  description: Yup.string(),
  images: Yup.mixed()
})
const validateUpdate = Yup.object({
  id_restaurant: Yup.number().nullable(),
  id_category: Yup.number().nullable(),
  name: Yup.string().nullable(),
  quantity: Yup.number().nullable(),
  price: Yup.number().nullable(),
  description: Yup.string().nullable(),
  images: Yup.mixed().required()
})
export default function FormItem (props) {
  const { update, setInitialValue, handleCloseForm, initialValue, showMessage } = props
  console.log(initialValue)
  console.log('idupdate', update)
  const [category, setCategory] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  const getrestaurant = async () => {
    try {
      const response = await getData('/users/restaurants')
      if (response.data.success && response.data.data) {
        setRestaurant(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getCategory = async () => {
    try {
      const response = await getData('/browse-categories')
      if (response.data.success && response.data.data) {
        setCategory(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getrestaurant()
    getCategory()
  }, [])
  return (
    <MuiThemeProvider theme={theme}>

    <Formik
      enableReinitialize
      initialValues={initialValue}
      validationSchema={!update ? validateCreate : validateUpdate}
      onSubmit={async (values, form) => {
        try {
          let response
          const formData = new FormData()
          if (!update) {
            Object.keys(values).forEach(v => {
              formData.append(v, values[v])
            })
            response = await submitData('/items', formData)
          } else {
            Object.keys(values).filter(v => initialValue[v] !== values[v]).forEach(v => {
              formData.append(v, values[v])
            })
            response = await patchData(`/items/${update}`, formData)
          }
          if (response.data.success) {
            showMessage(response.data)
            setInitialValue({ id: 0, id_restaurant: '', id_category: '', name: '', quantity: 0, price: 0, description: '', images: null })
            handleCloseForm()
            form.setSubmitting(false)
            form.resetForm()
          } else {
            showMessage(response.data)
          }
        } catch (e) {
          console.log(e)
          showMessage(e.response.data)
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
                    component={TextField} fullWidth label='Restaurant' margin='dense'
                    name='id_restaurant' select variant='outlined'
                  >
                    {
                      restaurant.map(v => (
                        <MenuItem key={v._id} value={v._id}>
                          {v.name}
                        </MenuItem>
                      ))
                    }
                  </CustomTextField>
                </Grid>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField} fullWidth label='Category' margin='dense'
                    name='id_category' select variant='outlined'
                  >
                    {
                      category.map(v => (
                        <MenuItem key={v._id} value={v._id}>
                          {v.name}
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
                  <CustomTextField
                    component={TextField}
                    fullWidth label='Quantity' margin='dense' name='quantity' type='number' required variant='outlined'
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <CustomTextField
                    component={TextField}
                    fullWidth label='Price' margin='dense' name='price' type='number' required variant='outlined'
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
                <Grid item md={4} xs={6}>
                  <Field
                    component={({ field, form, ...props }) => (
                      <TextField
                        fullWidth label='Images' margin='dense' name='images' type='file' onChange={(event) => {
                          form.setFieldValue('images', event.currentTarget.files[0])
                          console.log('alen')
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify='center'>
              <Button color='primary' variant='contained' type='submit'>
                {!update ? 'Add Item' : 'Update Item'}
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </Formik>
    </MuiThemeProvider>
  )
}
