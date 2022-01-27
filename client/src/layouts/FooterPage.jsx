import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CopyrightIcon from '@mui/icons-material/Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    backgroundColor: 'rgb(62, 63, 64)',
    padding: '45px 10px',
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
      <p className={classes.footerText}>Copyright <CopyrightIcon sx={{ fontSize: '15px' }}/> Залилов Констатин 2022</p>
    </div>
  )
}