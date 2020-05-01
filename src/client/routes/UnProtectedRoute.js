import React, { useContext } from 'react'
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { Redirect, Route } from 'react-router-dom'

export default function UnProtectedRoute(props) {
  console.log('<UnProtectedRoute>: ', props)
  const { Component, path } = props
  const { authenticated } = useContext(AuthenticatedContext)

  return (
    <Route
      path={path}
      render={({ location }) =>
        !authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
