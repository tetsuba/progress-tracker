import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Welcome to Progress Tracker...</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={4}>
          <Link to="/students" className="card text-body text-decoration-none">
            <div className="card-header">
              <h1>Students</h1>
            </div>
            <div className="card-body">Students</div>
            <div className="card-footer">Number of students</div>
          </Link>
        </Col>

        <Col sm={4}>
          <Link to="/myAccount" className="card text-body text-decoration-none">
            <div className="card-header">
              <h1>My Account</h1>
            </div>
            <div className="card-body">My Account</div>
            <div className="card-footer"></div>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
