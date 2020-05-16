import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

// CONTEXT
import { AuthenticatedContext } from '../context/AuthenticatedContext'

// TYPES
import type { ComponentType } from 'react'

type Props = {
  path: string,
  Component: ComponentType<any>,
}

export default function UnProtectedRoute(props: Props) {
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
