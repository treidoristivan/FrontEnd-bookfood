import React from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, TextField } from '@material-ui/core'
import { Form } from 'formik'
import CustomTextField from '../../../components/CustomTextField'
export default function FormCategories (props) {
  return (
    <Form>
      <Card elevation={0}>
        <CardHeader title='Adding Categories' titleTypographyProps={{ variant: 'h5', align: 'center' }} />
        <CardContent>
          <Grid container justify='center'>
            <Grid container sm={8} item spacing={2}>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Name' margin='dense' name='name' type='text' required variant='outlined'
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button color='primary' variant='contained' type='submit'>
              Add Category
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Form>
  )
}
