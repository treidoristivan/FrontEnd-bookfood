import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead,
  TableRow, TableBody, TableCell, Avatar, IconButton,
  Button, TextField, Dialog, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
import deleteData from '../../../helpers/deleteData'
import patchData from '../../../helpers/patchData'
import AlertDelete from '../../../components/AlertDelete'


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

export default function CartItems (props) {
  const { setMsg } = props
  const [openForm, setOpenForm] = React.useState(0)
  const [initialValues, setInitialValues] = React.useState({
    id: 0,
    total_items: 0
  })
  const [itemCart, setItemCart] = React.useState([])
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)

  const handleOpenForm = (id, totals) => {
    setInitialValues({ id: id, total_items: totals })
    setOpenForm(1)
  }
  const handleClick = (e) => {
    props.setActiveStep(1)
  }
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const deleteCart = async (id) => {
    try {
      const response = await deleteData(`/carts/${id}`)
      if (response.data.success) {
        setOpenDialogDelete(0)
        setMsg({ display: 1, success: response.data.success, message: response.data.msg })
      } else {
        setMsg({ display: 1, success: response.data.success, message: response.data.msg })
      }
    } catch (e) {
      console.log(e.response)
      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    setItemCart(props.data ? props.data.itemInCart : [])
  }, [props])
  return (
    <>
     <MuiThemeProvider theme={theme}>

      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteCart(deleteId)}
      />
      <Dialog
        open={openForm}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenForm(0)}
      >
        <DialogContentText align='center' style={{ marginTop: '10px' }}>Add or Less items</DialogContentText>
        <DialogContent>
          <Formik
             enableReinitialize
             initialValues={initialValues}
             validationSchema={
               !initialValues.id ? Yup.object({ total_items: Yup.number().required() }) : Yup.object({ total_items: Yup.number().nullable() })
             }
             onSubmit={async (values) => {
              try {
                const response = await patchData('/carts/' + values.id, { total_items: values.total_items })
                if (response.data.success) {
                  setOpenForm(0)
                  setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                } else {
                  setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                }
              } catch (e) {
                console.log(e)
                setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
              }
            }}
          >
            <Form align='center' style={{ marginTop: '10px' }}>
              <CustomTextField size='small' type='number' name='total_items' label='Total Items' variant='outlined' component={TextField} />
              <Button size='small' type='submit'>
                <ExitToAppOutlinedIcon fontSize='large' />
              </Button>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Grid container justify='center'>
          <Button variant='contained'  color='primary' onClick={() => setOpenForm(0)}>
            Cancel
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
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
                {itemCart.map((cart) => (
                  <TableRow key={cart._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton onClick={() => handleOpenForm(cart._id, cart.total_items)}><Edit /></IconButton>&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(cart._id)}><Delete /></IconButton>
                    </TableCell>
                    <TableCell align='right'>
                      <Avatar alt={cart.name_item} src={(process.env.REACT_APP_API_BASE_URL + '/' + cart.images)} style={{ height: '50px', width: '50px' }} />
                    </TableCell>
                    <TableCell align='right'>{cart.name_item}</TableCell>
                    <TableCell align='right'>
                      {cart.total_items}
                    </TableCell>
                    <TableCell align='right'>{cart.total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justify='center' component={Container} style={{ marginTop: 20, marginBottom: 30 }}>
        <Button
          color='secondary'
          variant='contained'
          onClick={handleClick}
        >
          Cart Details
        </Button>
      </Grid>
      </MuiThemeProvider>
    </>
  )
}
