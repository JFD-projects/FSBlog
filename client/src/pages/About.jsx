import React from 'react'
// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import { FEInfoComponent } from '../components/AboutComponents/FEInfoComponent'
import { RootInfoComponent } from '../components/AboutComponents/RootInfoComponent'
import { BEInfoComponent } from '../components/AboutComponents/BEInfoComponent'
import { AdditionalInfoComponent } from '../components/AboutComponents/AdditionalInfoComponent'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '870px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  btnBack: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}))

export const About = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Это дипломный pet-проект на курсе Владилена Минена
        </Typography>
      </Box>
      <RootInfoComponent />
      <FEInfoComponent />
      <BEInfoComponent />
      <AdditionalInfoComponent />
    </div>
  )
}