import React from 'react'
import {
  Paper, Grid, Button, TextField, MenuItem, IconButton, Box
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { Image } from '@material-ui/icons'
import CustomTextField from '../../../components/CustomTextField'
import pacthData from '../../../helpers/patchData'

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



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
  editProfile: {
    position: 'sticky',
    marginTop:'60px',
    left: '20px',
    top: '42%',
    right: '20px',
    bottom: '60px'
  },
  iconEditPic: {
    position: 'absolute',
    top: '10%',
    right: '3%',
    
  },
})
)

export default function CardEditProfile (props) {
  const classes = useStyles()
  const { userData, setUserPic, statusEdit, setMsg, setStatusEdit } = props
  return (
    <MuiThemeProvider theme={theme}>
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
            setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
          }
          setStatusEdit({ profile: false })
        }}
      > 
        <Form >
          <Grid container justify='center' alignItems='center' spacing={4} >


          <Box className={classes.iconEditPic} hidden={!statusEdit.profile}>
          <IconButton component='label' for='userProfileField' style={{ backgroundColor: 'rgba(0,0,0,.7)' }}><Image style={{ height: '25px', width: '25px', color: 'white' }} /></IconButton>
          </Box>


            <Grid item xs={3}>
              <CustomTextField type='text' name='fullname' label='Full Name' variant='outlined' size='small' component={TextField} />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField type='text' name='email' label='E-mail' variant='outlined' size='small' component={TextField} />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField component={TextField} fullWidth label='Gender' margin='dense' name='gender' select variant='outlined'>
                {
                  [{ label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }].map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))
                }
              </CustomTextField>
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


            <Grid item xs={12} container justify='center' >
              <CustomTextField style={{width:'78%'}}  type='text' name='address' label='Address' variant='outlined' size='medium' component={TextField} />
          </Grid>
          <Grid item xs={12} container justify='center'>
              <Button size='medium' color='secondary' variant='contained' type='submit' style={{width:'78%'}}>
                Save
              </Button>
          </Grid>
          </Grid>
        </Form>
      </Formik>
    </Paper>
    </MuiThemeProvider>
  )
}
