import React, { useContext } from 'react'
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { UserContext } from '../context/UserContext'
import { Redirect, Route } from 'react-router-dom'
import gql from 'graphql-tag'

export const USER_SESSION = gql`
  query($token: String) {
    isUserSessionExpired(token: $token) {
      firstName
      lastName
      id
      email
    }
  }
`

export default function ProtectedRoute({ Component, data, ...rest }) {
  const { authenticated, toggle: authenticateUser } = useContext(
    AuthenticatedContext
  )
  const { userLoggedIn } = useContext(UserContext)

  console.log('authenticated: ', authenticated)
  console.log('data: ', data)
  console.log('=============================================')
  console.log('=============================================')

  // First Load:
  // - data: undefined, authenticated: false
  // - data: Obj, authenticated: false
  // - data: Obj, authenticated: true

  // - data: undefined, authenticated: true

  if (data && !authenticated) {
    console.log('APP:', data)
    userLoggedIn(data.isUserSessionExpired)
    authenticateUser(true)
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authenticated) {
          return <Component />
        }

        if (!authenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      }}
    />
  )
}
