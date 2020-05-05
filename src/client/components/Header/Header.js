import React, { Fragment, useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// CONTEXT
// $FlowFixMe - Investigate how to fix this issue
import { AuthenticatedContext } from '../../context/AuthenticatedContext'

export const Header = () => {
  const { authenticated, toggle: userLogout } = useContext(AuthenticatedContext)

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Progress Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!authenticated && (
            <Fragment>
              <Link className="nav-link" to="/">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </Fragment>
          )}
          {authenticated && (
            <Fragment>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/students">
                Students
              </Link>
              <Link className="nav-link" to="/myAccount">
                My Account
              </Link>
              <Link
                className="nav-link"
                to="/login"
                onClick={() => userLogout('')}
              >
                Logout
              </Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
