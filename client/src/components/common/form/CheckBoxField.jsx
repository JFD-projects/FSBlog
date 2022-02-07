import React from 'react'
import { Checkbox, Box } from '@mui/material/'

export const CheckBoxField = ({ name, value, onChange, children, error, ...rest }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value })
  }

  return (
    <Box className="form-check" sx={{ color: 'white' }}>
      <Checkbox
        type="checkbox"
        value=""
        onChange={handleChange}
        id={name}
        checked={value}
        {...rest}
      />
      <label htmlFor="flexCheckDefault">
        {children}
      </label>
      {error &&
        <div className="invalid-feedback">{error}</div>
      }
    </Box>
  )
}