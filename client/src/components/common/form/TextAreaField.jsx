import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  taAddArticle: {
    background: 'transparent',
    border: '1px solid rgb(90, 89, 89)',
    width: '100%',
    padding: '10px',
    fontSize: '17px',
    outline: 'none',
    fontFamily: 'inherit',
    marginTop: theme.spacing(2)
  },
  errText: {
    color: '#eb4242'
  }
}))

export const TextAreaField = ({ label, name, className, value, onChange, error, ...rest }) => {
  const classes = useStyles()
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <Box sx={{ margin: '10px 0' }}>
      <label htmlFor={name}> {label}</label>
      <Box
        component="textarea"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={classes.taAddArticle}
        {...rest}
        rows="5"
      />
      {error &&
        <Box className={classes.errText} component="div">{error}</Box>
      }
    </Box>
  )
}