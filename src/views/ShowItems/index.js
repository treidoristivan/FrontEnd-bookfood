import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {
  Card, CardContent, CardActions,
  Typography, Button, Grid, Avatar, Container
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../helpers/getData'
const useStyles = makeStyles({
  listCategories: {
    borderBottom: '1px solid #ccc',
    minHeight: '100px',
    marginBottom: '50px'
  },
  buttonCategories: {
    marginLeft: '10px',
    width: '120px',
    fontWeight: 600
  },
  grid: {
    height: '100%',
    padding: '50px'
  },
  listItems: {
    minHeight: '200px'
  },
  avatar: {
    height: '100px',
    width: '100px'
  }
})

function ShowItems (props) {
  const classes = useStyles()
  const [activeCategory, setActiveCategory] = React.useState(0)
  const [dataItems, setData] = React.useState({})
  const [dataCategory, setDataCategory] = React.useState([])
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }
  const getCategory = async () => {
    try {
      const response = await getData('/browse-categories')
      console.log(response)
      setDataCategory(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getItems = async (page, category) => {
    try {
      const condition = `limit=5&sort[created_at]=1&page=${page}`
      let url = `/browse-items?${condition}`
      if (category) {
        console.log(category)
        url = `/browse-categories/${category}?${condition}`
      }
      const response = await getData(url)
      console.log(response.data)
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getCategory()
    getItems(page, activeCategory)
  }, [activeCategory, page])
  return (
    <>
      <div className={classes.listCategories}>
        <Container>
          <Grid container className={classes.grid}>
            <Button size='small' variant={parseInt(activeCategory) === 0 ? 'contained' : 'outlined'} onClick={() => { setActiveCategory(0); setPage(1) }} color='secondary' className={classes.buttonCategories}> Show All </Button>
            {
              dataCategory.length > 0 && dataCategory.map((cat) => (
                <Button key={cat._id} size='small' variant={parseInt(activeCategory) === parseInt(cat._id) ? 'contained' : 'outlined'} onClick={() => { setActiveCategory(`${cat._id}`); setPage(1) }} color='secondary' className={classes.buttonCategories}> {cat.name} </Button>
              ))
            }
          </Grid>
        </Container>
      </div>
      <div className={classes.listItems}>
        <Container>
          <Grid container justify='center' spacing={2}>
            {
              dataItems.dataItems ? dataItems.dataItems.map((item) => (
                <Grid item key={item._id} md={2} sm={4} xs={6}>
                  <Card align='center' style={{ padding: '10px' }}>
                    <Avatar alt={item.name} src={process.env.REACT_APP_API_URL + '/' + item.images} className={classes.avatar} />
                    <CardContent>
                      <Typography gutterBottom variant='subtite1' color='primary'>
                        {item.name}
                      </Typography>
                      <Typography gutterBottom variant='h6'>
                        Rp. {parseFloat(item.price).toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size='small' color='secondary' variant='contained'>
                        <AddShoppingCart />
                      </Button> */}
                      <Button size='small' color='primary' variant='contained' to={`/items/${item._id}`} component={Link}>
                      Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )) : (
                <Typography gutterBottom variant='subtite1' color='primary'>
                    Item Not Found
                </Typography>
              )
            }
          </Grid>
          {dataItems.pagination && console.log(dataItems.pagination)}
          {
            dataItems.pagination && dataItems.pagination.totalPages > 1 && (
              <Grid container justify='center' style={{ marginTop: '50px' }}>
                <Pagination page={page} onChange={handleChange} count={dataItems.pagination.totalPages} color='secondary' />
              </Grid>
            )
          }
          {/* <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle id='responsive-dialog-title'>How Many Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
              <TextField id='outlined-basic' fullWidth margin='normal' label='Total Item' variant='outlined' />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}
        </Container>
      </div>
    </>
  )
}

export default ShowItems
