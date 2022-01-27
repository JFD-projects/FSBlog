import React, { useState } from 'react'
// import { handleKeyDown } from '../../../static/funcsForForm'
// Material UI:
import { TextField, OutlinedInput, FormControl, InputAdornment, IconButton, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material/'
import { FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  errText: {
    color: '#eb4242'
  }
}))
export const ComponentInput = ({ label, type, name, value, onChange, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      {type === 'password' ? (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            error={!!error}
            id={name}
            className={classes.root}
            type={showPassword ? 'text' : type}
            name={name}
            value={value}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText className={classes.errText}>{error}</FormHelperText>
        </FormControl>
      ) : (
        <TextField
          label={label}
          error={!!error}
          type={showPassword ? 'text' : type}
          id={name}
          className={classes.root}
          name={name}
          value={value}
          onChange={handleChange}
          helperText={error}
          {...rest}
        />
      )}
      {/* {error &&
        <div className="error-field-form">{error}</div>
      } */}
    </>
  )
}