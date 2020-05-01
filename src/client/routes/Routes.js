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

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={Home} />
      <ProtectedRoute path="/students" component={Students} />
      <ProtectedRoute path="/myAccount" component={MyAccount} />
      <ProtectedRoute path="/student/:id" component={Student} />

      <UnProtectedRoute path="/login" Component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/confirm/:token" component={ConfirmAccount} />
      <Route path="/reset/:token" component={ResetPassword} />
      <CourseRoutes />
    </Switch>
  )
}
