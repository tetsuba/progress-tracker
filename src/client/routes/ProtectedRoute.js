import React, { useContext } from 'react'
import { AuthenticatedContext } from '../context/AuthenticatedContext'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute(props) {
  console.log('<ProtectedRoute>: ', props)
  const { authenticated } = useContext(AuthenticatedContext)

  if (!authenticated) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }
  return <Route {...props} />
}
