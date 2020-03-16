import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardMedia, 
  Dialog,DialogContentText,
  DialogContent, DialogTitle,
  DialogActions, CardContent,
  CardActionArea, CardActions,
  Typography, Button, Grid,
  Container, TextField} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
// import image from '../Home/assets/1.png'
//import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';



const useStyles = makeStyles({
  listCategories: {
    marginTop: '13vh',
    borderBottom: '1px solid #ccc',
    minHeight: '100px',
    marginBottom: '50px'
  },
  buttonCategories:{
    marginLeft: '10px',
    width: '120px',
    fontWeight:600
  },
  grid: {
    height: '80%',
    padding:'0px',
    boxShadow: '0px 1px 8px #ffc400',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius:'3%'
    
  },
  listItems:{
    minHeight:'200px'
  },
  Media: {
    borderRadius:'10%',
    maxWidth:'200px',
    maxHeight: '200px',
    margin:'0 auto'
  }
})
function ShowItems (props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div className={classes.listCategories}>
        <Container>
         

        </Container>
      </div>
      <div className={classes.listItems}>
        <Container>
          <Grid className={classes.grid}
           container justify='center' spacing={8}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((v,i) => (
                <Grid item key={i} md={3} sm={4} xs={6} >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        alt='Chikken DrumStick'
                        height='200'
                        image={`http://localhost:1000/uploads/1.png`}
                        title='Chikken DrumStick'
                        className={classes.Media}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        French Fries
                      </Typography>
                      <p style={{ color: green[500] }}>Price: Rp.15000,00</p>
                    </CardContent>
                    <CardActions>
                      <Button style={{ color: green[500] }} size='small' onClick={handleClickOpen}>
                        ADD To Cart
                      </Button>
                      <Button size='small' color='secondary'>
                        Items Reviews
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle id='responsive-dialog-title'>Input Much Items</DialogTitle>
            <DialogContent>
              <DialogContentText>
              <TextField id='outlined-basic' fullWidth margin='normal' label='Total Item' variant='outlined' />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='primary'>
                Check
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  )
}

export default ShowItems
