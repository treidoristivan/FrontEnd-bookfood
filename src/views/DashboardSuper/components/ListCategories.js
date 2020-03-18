import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow,
  TableBody, TableCell, IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'
import AlertDelete from '../../../components/AlertDelete'

export default function ListItem (props) {
  const { handleOpenForm, setInitialValues } = props
  const [categories, setCategories] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const handeClickUpdate = async (id) => {
    await getCategory(id)
    handleOpenForm()
  }
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const getCategories = async () => {
    try {
      const response = await getData('/browse-categories?sort[_id]=1&page=' + page)
      console.log(response)
      setCategories(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getCategory = async (id) => {
    try {
      const response = await getData(`/browse-categories/${id}`)
      setInitialValues({ id: response.data._id, name: response.data.name })
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const deleteCategories = async (id) => {
    try {
      const response = await deleteData(`/categories/${id}`)
      setOpenDialogDelete(0)
      await props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      await props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getCategories()
  }, [props, page])

  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteCategories(deleteId)}
      />
      <Grid container justify='center' component={Container}>
        <Grid item sm={8} md={6}>
          <TableContainer align='center'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.data && categories.data.length > 0 && categories.data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton onClick={() => handeClickUpdate(item._id)}><Edit /></IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(item._id)}><Delete /></IconButton>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {
          categories.pagination && (
            <Grid container justify='center' style={{ marginTop: '50px' }}>
              <Pagination page={page} onChange={handleChangePage} count={categories.pagination.totalPages} color='secondary' />
            </Grid>
          )
        }
      </Grid>
    </>
  )
}
