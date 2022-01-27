import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
// layouts:
import { NavbarComponent } from './layouts/NavbarComponent'
import { Auth } from './layouts/Auth'
import { ArticlesContainer } from './layouts/ArticlesContainer'
import { FooterPage } from './layouts/FooterPage'
// pages:
import { AdminAllPage } from './pages/AdminAllPage'
import { StartPage } from './pages/StartPage'
// components:
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AppLoader } from './components/ui/hoc/AppLoader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
// Material UI:
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArticlesProvider } from './hooks/useArticles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'md',
    minHeight: 'calc(100vh - 100px)'
  }

}))
function App () {
  const { isAuth, currentUser } = useAuth()
  const classes = useStyles()
  return (
    <>
      <AppLoader>
        <>
          <NavbarComponent />
          <Container className={classes.root}>
            <Route exact path='/' component={StartPage} />
            <ArticlesProvider>
              <Route path='/articles/:articleId?' component={ArticlesContainer} />
              <ProtectedRoute path='/admin' component={AdminAllPage} auth={isAuth} currentUser={currentUser} />
            </ArticlesProvider>
            <Route path='/auth/:type?' component={Auth} />
          </Container>
          <FooterPage />
          {/* {
            (location.pathname === '/articles' || location.pathname === '/') && <FooterPage />
          } */}
        </>
      </AppLoader>
      <ToastContainer />
    </>
  )
}
export default App