import React from 'react'

import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

export const STUDENT_QUERY = gql`
  query($input: StudentIdInput!) {
    getStudent(input: $input) {
      firstName
      lastName
    }
  }
`

const Student = () => {
  const { id } = useParams()
  const { loading, data } = useQuery(STUDENT_QUERY, {
    variables: { input: { id } },
  })
  if (loading) return <div>LOADING</div>
  const crumbs = [
    { path: '/', name: 'Home' },
    { path: '/students', name: 'Students' },
    { path: '', name: data.getStudent.firstName },
  ]

  const courses = [
    {
      name: 'ABC...',
      progress: 20,
      startDate: '',
      endDate: '',
      active: true,
      to: '/course/abc',
    },
    {
      name: 'French',
      progress: 20,
      startDate: '',
      endDate: '',
      active: true,
      to: '/course/abc',
    },
    {
      name: 'Japanese',
      progress: 20,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc',
    },
    {
      name: 'Maths',
      progress: 20,
      startDate: '',
      endDate: '',
      active: false,
      to: '/course/abc',
    },
  ]

  const renderCourses = () =>
    courses.map((card) => (
      <Col sm={4} key={card.name}>
        <Link to={card.to} className="card text-body text-decoration-none">
          <div className="card-header">
            <h1>{card.name}</h1>
          </div>
          <div className="card-body">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div className="card-footer">
            {!card.active && <span>Click here to begin</span>}
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
        <Row className="mt-5">
          <BreadCrumbs crumbs={crumbs} />
        </Row>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>
            Student Name: {data.getStudent.firstName} {data.getStudent.lastName}
          </h1>
          <h1>Student ID: {id}</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
      </Row>

      <Row>{renderCourses()}</Row>
    </Container>
  )
}

export default Student
