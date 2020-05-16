import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

// CONTEXT
import { AuthenticatedContext } from '../context/AuthenticatedContext'

// TYPES
import type { ComponentType, Node } from 'react'
import type { ContextRouter, LocationShape } from 'react-router-dom'

type Props = {|
  component?: ComponentType<*>,
  render?: (router: ContextRouter) => Node,
  children?: ComponentType<ContextRouter> | Node,
  path?: string | Array<string>,
  exact?: boolean,
  strict?: boolean,
  location?: LocationShape,
  sensitive?: boolean,
|}

export default function ProtectedRoute(props: Props) {
  console.log('<ProtectedRoute>: ', props)
  const { authenticated } = useContext(AuthenticatedContext)

  if (!authenticated) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }
  return <Route {...props} />
}
