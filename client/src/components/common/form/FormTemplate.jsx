import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(style)': { m: 'auto', width: '100%' },
    display: 'flex',
    flexDirection: 'column'
  },
  divActions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: '#101c24'
  },
  enterCls: {
    color: 'red'
  }
}))
export const FormTemplate = ({ handleSubmit, isValid, enterErrors, loginError, children }) => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <form
      component="form"
      className={ classes.root }
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {children}
      <div className={ classes.divActions}>
        <Button
          type="submit"
          disabled={!isValid || !!enterErrors}
          variant="outlined"
          color="inherit"
        >
          Войти
        </Button>
        {enterErrors && <Typography className={classes.enterCls} variant="body2" gutterBottom>{enterErrors}</Typography>}
        {loginError && <Typography className={classes.enterCls} variant="body2" gutterBottom>{loginError}</Typography>}
        <Button variant="outlined" color="inherit" onClick={() => { history.push('/') }}>Отмена</Button>
      </div>
    </form>
  )
}