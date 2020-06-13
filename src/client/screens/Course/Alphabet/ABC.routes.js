import React from 'react'
import ABC from './ABC'
import AbcUnit from './AbcUnit'
import ProtectedRoute from '../../../routes/ProtectedRoute'

export default () => (
  <>
    <ProtectedRoute strict path="/student/:id/course/ABC" component={ABC} />
    <ProtectedRoute path="/student/:id/course/ABC/:unit" component={AbcUnit} />
  </>
)
