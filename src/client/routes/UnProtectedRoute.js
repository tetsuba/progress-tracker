import React, { useContext } from 'react'
// $FlowFixMe - Investigate how to fix context flow issue
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { Redirect, Route } from 'react-router-dom'

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
