import React from 'react'
import {
  Dialog, DialogActions, DialogContent, Typography, Button,
} from '@material-ui/core'
import { Warning } from '@material-ui/icons'
export default function AlertDelete (props) {
  const { onCancel, onDelete, ...resultProps } = props
  return (
    <Dialog
      {...resultProps}
    >
      <DialogContent align='center'>
        <Warning style={{ height: '100px', width: '100px' }} color='secondary' />
        <Typography variant='h6' color='secondary'> Dont think it's waranted. Are you sure about delete ?</Typography>
        <Typography variant='subtite2' color='textSecondary'> Deleted Success !!</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' color='secondary' onClick={onDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
