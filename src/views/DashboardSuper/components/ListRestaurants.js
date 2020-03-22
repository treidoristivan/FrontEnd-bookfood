import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow,
  TableBody, TableCell, Avatar, IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'
import AlertDelete from '../../../components/AlertDelete'

export default function ListItem (props) {
  const { handleOpenForm, setInitialValues } = props
  const [restaurant, setRestaurant] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const handeClickUpdate = async (id) => {
    await getrestaurant(id)
    handleOpenForm()
  }
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const getrestaurants = async (page) => {
    try {
      const response = await getData('/restaurants?sort[_id]=1&page=' + page)
      if (response.data.success && response.data.data) {
        console.log(response.data)
        setRestaurant(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getrestaurant = async (id) => {
    try {
      const response = await getData(`/browse-restaurants/${id}`)
      const { _id, ...updateValue } = response.data.data
      setInitialValues({ id: _id, ...updateValue })
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const deleteRestaurant = async (id) => {
    try {
      const response = await deleteData(`/restaurants/${id}`)
      setOpenDialogDelete(0)
      await props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      await props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getrestaurants(page)
  }, [props, page])
  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteRestaurant(deleteId)}
      />
      <Grid container justify='center' component={Container}>
        <Grid item sm={11} md={10}>
          <TableContainer align='center'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurant.data && restaurant.data.length > 0 && restaurant.data.map((resto) => (
                  <TableRow key={resto._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton onClick={() => handeClickUpdate(resto._id)}>
                        <Edit />
                      </IconButton>&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(resto._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell> <Avatar alt={resto.name ? resto.name : 'Res' + resto._id} src={(process.env.REACT_APP_API_BASE_URL + '/' + resto.logo)} style={{ height: '50px', width: '50px' }} /></TableCell>
                    <TableCell>{resto.name}</TableCell>
                    <TableCell>{resto.owner}</TableCell>
                    <TableCell>{resto.address}</TableCell>
                    <TableCell>{resto.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {
        restaurant.pagination && (
          <Grid container justify='center' style={{ marginTop: '50px' }}>
            <Pagination page={page} onChange={handleChangePage} count={restaurant.pagination.totalPages} color='secondary' />
          </Grid>
        )
      }
    </>
  )
}
