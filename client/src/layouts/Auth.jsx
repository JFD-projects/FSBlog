import React from 'react'
import { LoginForm } from '../components/ui/LoginForm'
import { RegisterForm } from '../components/ui/RegisterForm'
import { useParams, NavLink } from 'react-router-dom'
import { SubTitle } from '../components/common/typografy/SubTitle'
// Material UI:
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  authBlock: {
    border: '2px solid #0012ff',
    borderRadius: '3px',
    padding: '10px 40px 40px 40px',
    margin: '20px auto',
    maxWidth: '550px'
  },
  linkAuth: {
    textDecoration: 'none',
    color: '#0012ff'
  }
}))
export const Auth = () => {
  const { type } = useParams()
  const classes = useStyles()
  return (
    <Box className={classes.authBlock}>
      {type === 'register' ? (
        <>
          <SubTitle>Регистрация</SubTitle>
          <RegisterForm />
          <Box sx={{ textAlign: 'center' }}>
            <NavLink to='/auth/login' className={classes.linkAuth}>Есть логин?</NavLink>
          </Box>
        </>
      ) : (
        <>
          <SubTitle>Вход</SubTitle>
          <LoginForm />
          <Box sx={{ textAlign: 'center' }}>
            <NavLink to='/auth/register' className={classes.linkAuth}>Нет логина?</NavLink>
          </Box>
        </>
      )}
    </Box>
  )
}