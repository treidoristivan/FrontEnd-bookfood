import React from 'react'
import { Grid } from '@material-ui/core'

export default function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      hidden={value !== index}
      style={{padding: '10px', paddingTop:'25px', marginBottom:'25px'}}
      {...other}
    >
      {children}
    </Grid>
  )
}