import React from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, MenuItem, Button, TextField } from '@material-ui/core'
import { Form } from 'formik'
import CustomTextField from '../../../components/CustomTextField'
export default function FormUser (props) {
  return (
    <Form>
      <Card elevation={0}>
        <CardHeader title='Adding Users' titleTypographyProps={{variant: 'h5', align: 'center'}}/>
        <CardContent>
          <Grid container justify='center'>
            <Grid container sm={8} item spacing={2}> 
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Full Name' margin='dense' id='fullname' name='fullname' type='text' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Username' margin='dense' name='username' type='text' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Password' margin='dense' name='password' type='password' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='E-Mail' margin='dense' name='email' type='text' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth
                  label='Gender'
                  margin='dense'
                  name='gender'
                  select
                  variant='outlined'
                >
                  {
                    [{ label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' }].map(option => (
                      <MenuItem key={option.value} value={option.value} >
                        {option.label}
                      </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth
                  label='Role'
                  margin='dense'
                  name='role'
                  select
                  variant='outlined'
                >
                  {
                    [{label:'User',value:1},
                      {label:'Admin',value:2},
                      {label:'SuperAdmin',value:3}].map(option => (
                      <MenuItem key={option.value} value={option.value} >
                        {option.label}
                      </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button color='primary' variant='contained' type='submit' >
              Save User
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Form>
  )
}
