import React from 'react'
import { Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Avatar, IconButton ,Button, TextField } from '@material-ui/core'
import {Edit, Delete, Check} from '@material-ui/icons'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
export default function CartItems (props) {
  const handleClick = (e) => {
    props.setActiveStep(1)
  }
  const [itemCart, setItemCart] = React.useState([])
  React.useEffect(() => {
    setItemCart(props.data.data ? props.data.data.itemInCart : [])
    console.log(itemCart)
  },[props])
  return (
    <>
      <Grid container justify='center' component={Container}>
        <Grid item sm={10} md={8}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell align='right'>Image</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Total Items</TableCell>
                  <TableCell align='right'>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemCart.map((cart,i) => (
                  <TableRow key={cart._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton><Edit/></IconButton>&nbsp;&nbsp;<IconButton><Delete/></IconButton>
                    </TableCell>
                    <TableCell align='right'> <Avatar alt={cart.name_item} src={(process.env.REACT_APP_API_URL + '/' + cart.images)} style={{height:'50px',width:'50px'}} /></TableCell>
                    <TableCell align='right'>{cart.name_item}</TableCell>
                    <TableCell align='right'>
                      <Grid hidden={0}>
                        {cart.total_items}
                      </Grid>
                      <Grid hidden={1}>
                        <Formik
                          initialValues={{total_items:cart.total_items}}
                          validationSchema={{total_items:Yup.number().required()}}
                          validate={(value)=>{
                            console.log(value)
                          }}
                        >
                          <Form>
                            <CustomTextField size='small' type='number' name='total_items' label='Total Items' variant='outlined' style={{width:'100px'}} component={TextField} />
                            <Button size='small'>
                              <Check />
                            </Button>
                          </Form>
                        </Formik>
                      </Grid>
                    </TableCell>
                    <TableCell align='right'>{cart.total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justify='center' component={Container} style={{marginTop:20}}>
        <Button
          color='primary'
          variant='outlined'
          onClick={handleClick}
        >
          Check Detail
        </Button>
      </Grid>
    </>
  )
}