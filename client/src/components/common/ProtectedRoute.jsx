import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ auth, currentUser, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth && currentUser === 'adminblog@test.ru') return <Component {...props} />
        if (!auth || currentUser !== 'adminblog@test.ru') return <Redirect to="/auth/login" />
      }}
    />
  )
}