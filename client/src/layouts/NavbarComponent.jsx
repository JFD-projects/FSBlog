import React, { useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUserId, logOut, getCurrentUserEmail } from '../store/users'
// material-ui:
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'

const useStyles = makeStyles((theme) => ({
  rootNav: {
    width: '100%',
    backgroundColor: '#101c24'
  },
  menuButton: {
    flexGrow: 0
  },
  menuList: {
    '& a.active': {
      fontWeight: 'bold',
      textDecoration: 'underline'
    },
    display: 'flex',
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  userInfoBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userInfo: {
    fontStyle: 'italic'
  }
}))

export const NavbarComponent = () => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const isAuth = useSelector(getCurrentUserId()) || ''
  const currentUser = useSelector(getCurrentUserEmail()) || ''
  const classes = useStyles()
  const history = useHistory()
  const matches = useMediaQuery('(max-width:768px)')
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClick = (pageURL) => {
    history.push(pageURL)
    setAnchorEl(null)
  }
  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <AppBar position="static" className={classes.rootNav}>
      <Toolbar>
        <Typography variant="h5" className={classes.title} onClick={() => handleMenuClick('/')}>
          БлогFrontend
        </Typography>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleMenuClick('/')}>
            Главная
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/articles')}>
            Список статей
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/admin')}>
            RootДоступ
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/about')}>
            About
          </MenuItem>
          {!isAuth ? (
            <div>
              <MenuItem onClick={() => handleMenuClick('/auth/login')}>
                Вход
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('/auth/register')}>
                Регистрация
              </MenuItem>
            </div>
          ) : (
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="inherit" /> Выход
            </MenuItem>
          ) }
        </Menu>
        {matches ? (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            area-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <div className={classes.menuList}>
              <MenuItem exact to='/' component={NavLink}>
                Главная
              </MenuItem>
              <MenuItem to='/articles' component={NavLink}>
                Список статей
              </MenuItem>
              <MenuItem to='/admin' component={NavLink}>
                RootДоступ
              </MenuItem>
              <MenuItem to='/about' component={NavLink}>
                About
              </MenuItem>
            </div>
            {!isAuth ? (
              <Button color="inherit" onClick={() => handleMenuClick('/auth/login')}><LoginIcon fontSize="inherit" />Login</Button>
            ) : (
              <div className={classes.userInfoBlock}>
                <div className={classes.userInfo}>{currentUser}</div>
                <Button size="small" color="inherit" onClick={handleLogout}><LogoutIcon fontSize="inherit" /> Выход</Button>
              </div>
            )}
          </>
        )
        }
      </Toolbar>
    </AppBar>
  )
}