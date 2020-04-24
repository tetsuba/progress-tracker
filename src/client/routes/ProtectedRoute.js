import React, { useContext } from 'react'
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

export default function ProtectedRoute({ Component, data, ...rest }) {
  const { authenticated, toggle: authenticateUser } = useContext(
    AuthenticatedContext
  )
  const token = localStorage.getItem('ptToken')

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
    authenticateUser(token)

    // This is the fixes page refresh issue.
    // staying on the same route location
    return <Loading />
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
