import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const Auth = {
  // isAuthenticated: false,
  authenticate(cb) {
    // this.isAuthenticated = true
    //setTimeout(cb, 100)
  },
  signout(cb) {
    // this.isAuthenticated = false
    //setTimeout(cb, 100)
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.authenticate() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)


