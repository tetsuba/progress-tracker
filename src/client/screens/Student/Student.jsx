import React from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { CRUMBS_KEY } from '../../components/BreadCrumbs/crumbs'

// QUERIES
import { STUDENT_QUERY } from '../../api/student/student.query'

const Student = () => {
  const { id } = useParams()
  const { loading, data } = useQuery(STUDENT_QUERY, {
    variables: { input: { id } },
  })
  if (loading) return <div>LOADING</div>

  const courses = [
    {
      name: 'ABC...',
      progress: 20,
      startDate: '',
      endDate: '',
      active: true,
      to: `/student/${id}/course/ABC`,
    },
    {
      name: 'French',
      progress: 20,
      startDate: '',
      endDate: '',
      active: true,
      to: `/student/${id}/course/ABC`,
    },
    {
      name: 'Japanese',
      progress: 20,
      startDate: '',
      endDate: '',
      active: false,
      to: `/student/${id}/course/ABC`,
    },
    {
      name: 'Maths',
      progress: 20,
      startDate: '',
      endDate: '',
      active: false,
      to: `/student/${id}/course/ABC`,
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
          <BreadCrumbs
            crumbKey={CRUMBS_KEY.STUDENT}
            name={data.getStudent.firstName}
            id={id}
          />
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
