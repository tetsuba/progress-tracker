import React from 'react'
import { Route, Switch } from 'react-router-dom'

// COMPONENTS
import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'
import MyAccount from '../screens/MyAccount/MyAccount'
import Student from '../screens/Student/Student'
import Students from '../screens/Students/Students'

// ROUTES
import ProtectedRoute from './ProtectedRoute'
import UnProtectedRoute from './UnProtectedRoute'
import CourseRoutes from '../screens/Course/routes'
import ConfirmAccount from '../screens/ConfirmAccount/ConfirmAccount'
import ResetPassword from '../screens/ResetPassword/ResetPassword'
import ABC from '../screens/Course/ABC/ABC'
import AbcUnit from '../screens/Course/ABC/AbcUnit'

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={Home} />
      <ProtectedRoute path="/students" component={Students} />
      <ProtectedRoute path="/myAccount" component={MyAccount} />
      <ProtectedRoute path="/student/:id" exact component={Student} />
      {
        // TODO: Do I need a link to courses?
        /*<ProtectedRoute path="/student/:id/courses" component={} />*/
      }
      <ProtectedRoute strict path="/student/:id/course/ABC" component={ABC} />
      <ProtectedRoute
        path="/student/:id/course/ABC/:unit"
        component={AbcUnit}
      />
      <UnProtectedRoute path="/login" Component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/confirm/:token" component={ConfirmAccount} />
      <Route path="/reset/:token" component={ResetPassword} />
      <CourseRoutes />
    </Switch>
  )
}
