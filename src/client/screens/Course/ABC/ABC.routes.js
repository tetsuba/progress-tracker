import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import ABC from './ABC'
import AbcUnit from './AbcUnit'

export default () => (
  <Fragment>
    <Route exact path="/course/ABC" component={ABC} />
    <Route path="/course/ABC/:unit" component={AbcUnit} />
  </Fragment>
)
