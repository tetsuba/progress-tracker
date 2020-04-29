import React, { useContext } from 'react'
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ Component, data, ...rest }) {
  const { authenticated } = useContext(AuthenticatedContext)

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
