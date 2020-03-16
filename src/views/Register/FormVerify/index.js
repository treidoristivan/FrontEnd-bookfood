import React from 'react'
import { Grid, Card, CardHeader, Button, CardMedia, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import logo from '../../../assets/logo.png'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import getData from '../../../helpers/getData'
import CustomTextField from '../../../components/CustomTextField'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles({
  content: {
    marginTop: '80px'
  },
  containerForm: {
    padding: '20px'
  }
})

const initialCodeVerify = { code_verify: '' }
const msgRequired = 'This is Required'
const validationSchemaCode = Yup.object({
  code_verify: Yup.string().required(msgRequired)
})

function FormVerify (props) {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
      <Grid item md={5} lg={4} sm={8}>
        <Card className={classes.containerForm}>
          <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} />} />
          <CardMedia>
            <Formik
              initialValues={initialCodeVerify}
              validationSchema={validationSchemaCode}
              onSubmit={async (values, form) => {
                try {
                  const response = await getData(`/verify?code=${values.code_verify}`, values)
                  if (response.data.success) {
                    props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                    form.setSubmitting(false)
                    form.resetForm()
                    setTimeout(history.push('/login'), (400 * 1000))
                  }
                  props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                } catch (e) {
                  console.log(e)
                  props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                }
              }}
            >
              <Form>
                <Typography variant='h5' color='textSecondary' align='center'>
                  Open Your Email to Get Code!
                </Typography>
                <CustomTextField
                  component={TextField}
                  fullWidth margin='normal' label='Code Verify' name='code_verify' variant='outlined' type='text'
                />
                <Button
                  type='submit'
                  fullWidth
                  size='large'
                  variant='contained'
                  color='primary'
                >
                  <strong>Verify</strong>
                </Button>
              </Form>
            </Formik>
          </CardMedia>
        </Card>
      </Grid>
    </Grid>
  )
}
export default FormVerify
