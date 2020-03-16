import React from 'react'
import { Typography,  Paper } from '@material-ui/core'
import bg from '../Page403/assets/3.png';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  imageContainer: {
    position: 'fixed',
    marginTop:'0px',
    marginBottom:'0px',
    marginLeft:'0px',
    marginRight:'0px',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    zIndex:'99999',
    marginTop:'0px',
    marginBottom:'0px',
    marginLeft:'0px',
    marginRight:'0px',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  Show: {
    position: 'absolute',
    top: '50px',
    bottom: '50px',
    zIndex: '99999999'
  },
  itemDescription: {
    position: 'absolute',
    top:'36%',
    fontWeight:800,
    padding:'20px',
    left:'30%'
  },
  h2: {
    fontSize:65,
    color: 'white'
  }
  
  
  }))

export default function Page404 (props) {
  const classes = useStyles()
  return (
    <Paper elevation={0} className={classes.imageContainer}>
      <img src={bg} className={classes.image} />
      <div className={classes.itemDescription}>
      <Typography className={classes.h2}><strong>404</strong> Page Not Found</Typography>
      </div>
    </Paper>
  )
}

