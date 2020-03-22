import React from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, TextField,makeStyles } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
import submitData from '../../../helpers/submitData'
import patchData from '../../../helpers/patchData'
const msgRequired = 'This is Required'

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
const useStyles = makeStyles({
  
})

export default function FormCategories (props) {
  const { setMsg, update, initialValues, setInitialValues, handleCloseForm } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required(msgRequired)
      })}
      onSubmit={async (values, form) => {
        try {
          let response
          if (!update) {
            response = await submitData('/categories', values)
          } else {
            response = await patchData('/categories/' + update, values)
          }
          if (response && response.data.success) {
            setMsg({ display: 1, success: response.data.success, message: response.data.msg })
            form.setSubmitting(false)
            form.resetForm()
            setInitialValues({ id: 0, name: '' })
            handleCloseForm()
          } else {
            setMsg({ display: 1, success: response.data.success, message: response.data.msg })
          }
        } catch (e) {
          console.log(e)
          console.log('err', e.response)
          setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
        }
      }}
    >
      <Form>
        <Card elevation={0}>
          <CardHeader title={!update ? 'Adding Categories' : 'Update Category'} titleTypographyProps={{ variant: 'h5', align: 'center' }} />
          <CardContent>
            <Grid container justify='center'>
              <Grid item md={8} sm={10}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Name' margin='dense' name='name' type='text' required variant='outlined'
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify='center'>
              <Button color='primary' variant='contained' type='submit'>
                {!update ? 'Add Category' : 'Update Category'}
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </Formik>
  )
}
