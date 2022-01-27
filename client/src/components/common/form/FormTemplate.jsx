import React from 'react'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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
    marginBottom: theme.spacing(2)
  },
  enterCls: {
    color: 'red'
  }
}))
export const FormTemplate = ({ handleSubmit, isValid, enterErrors, children }) => {
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
        >
          Войти
        </Button>
        {enterErrors && <Typography className={classes.enterCls} variant="body2" gutterBottom>{enterErrors}</Typography>}
        <Button variant="outlined" onClick={() => { history.push('/') }}>Отмена</Button>
      </div>
    </form>
  )
}