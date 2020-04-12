import React from 'react'

import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'

export const STUDENT_QUERY = gql`
  query($input: StudentIdInput!) {
    getStudent(input: $input) {
      firstName
      lastName
    }
  }
`

const ABC = () => {
  // const { id } = useParams();

  const crumbs = [
    { path: '/', name: 'Home' },
    { path: '/students', name: 'Students' },
    { path: '/student/id', name: 'Student Name' },
    { path: '', name: 'ABC' },
  ]

  const units = [
    {
      value: 'Aa',
      progress: 60,
      startDate: '',
      endDate: '',
      active: true,
      to: '/course/abc/a',
    },
    {
      value: 'Bb',
      progress: 20,
      startDate: '',
      endDate: '',
      active: true,
      to: '/course/abc/b',
    },
    {
      value: 'Cc',
      progress: 2,
      startDate: '',
      endDate: '',
      active: true,
      to: '/course/abc/c',
    },
    {
      value: 'Dd',
      progress: 0,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc/d',
    },
    {
      value: 'Ee',
      progress: 0,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc/e',
    },
    {
      value: 'Ff',
      progress: 0,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc/f',
    },
    {
      value: 'Gg',
      progress: 0,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc/g',
    },
  ]

  const renderCards = () =>
    units.map((card) => (
      <Col sm={3}>
        <Link to={card.to} className="card text-body text-decoration-none">
          <div className="card-body">
            <h1>{card.value}</h1>
          </div>
          <div className="card-footer">
            {!card.active && <p>Click here to begin</p>}
            {card.active && (
              <ProgressBar now={card.progress} label={`${card.progress}%`} />
            )}
          </div>
        </Link>
      </Col>
    ))

  return (
    <Container>
      <Row className="mt-5">
        <BreadCrumbs crumbs={crumbs} />
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>ABC</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
      </Row>

      <Row className="mt-5">{renderCards()}</Row>
    </Container>
  )
}

export default ABC
