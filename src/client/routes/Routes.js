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
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading/Loading'
import ConfirmAccount from '../screens/ConfirmAccount/ConfirmAccount'
import ResetPassword from '../screens/ResetPassword/ResetPassword'
import { USER_SESSION } from '../api/user/user.query'

export const Routes = () => {
  const token = localStorage.getItem('ptToken')
  const { loading, data } = useQuery(USER_SESSION, { variables: { token } })

  console.log('token:', token)
  console.log('loading: ', loading)
  console.log('data: ', data)

  if (loading) return <Loading />

  return (
    <Switch>
      <ProtectedRoute path="/" exact Component={Home} data={data} />
      <ProtectedRoute path="/students" Component={Students} data={data} />
      <ProtectedRoute path="/myAccount" Component={MyAccount} data={data} />
      <ProtectedRoute path="/student/:id" Component={Student} data={data} />

      <UnProtectedRoute path="/login" Component={Login} />

      <Route path="/register" component={Register} />
      <Route path="/confirm/:token" component={ConfirmAccount} />
      <Route path="/reset/:token" component={ResetPassword} />
      <CourseRoutes />
    </Switch>
  )
}
