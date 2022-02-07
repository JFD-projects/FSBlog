import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CopyrightIcon from '@mui/icons-material/Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    backgroundColor: '#010a10',
    padding: '25px 10px',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  footerText: {
    fontSize: '18px',
    color: 'inherit'
  }
}))

export const FooterPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <p className={classes.footerText}>Copyright <CopyrightIcon sx={{ fontSize: '15px' }}/> 2022</p>
      <p className={classes.footerText}>Залилов Констатин zalilov@list.ru</p>
    </div>
  )
}