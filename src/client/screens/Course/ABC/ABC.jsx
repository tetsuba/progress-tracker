import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'

// COMPONENTS
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import Alphabet from '../../../components/Alphabet/Alphabet'
import { CRUMBS_KEY } from '../../../components/BreadCrumbs/crumbs'
import AlphabetForm from '../../../components/Form/AlphabetForm'

// QUERIES
import { GET_STUDENT_COURSE_ABC } from '../../../api/course/courseABC/courseABC.query'

export default function ABC() {
  const { id } = useParams()
  const variables = {
    input: {
      id: id || '',
    },
  }
  const options = {
    variables,
  }
  // $FlowFixMe - Investigate how to fix this flow issue
  const { loading, data } = useQuery(GET_STUDENT_COURSE_ABC, options)

  if (loading) return <div>LOADING</div>

  return (
    <Container>
      <Row className="mt-5">
        <BreadCrumbs
          crumbKey={CRUMBS_KEY.ABC}
          name={data.getStudentCourseABC.studentName}
          id={id}
        />
      </Row>
      <Row className="mt-5">
        <h1>ABC</h1>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Summary:</h3>
          <h3>Letters to start:</h3>
          <h3>Letters to work on:</h3>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>{id && <AlphabetForm id={id} />}</Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>History:</h3>
          <ListGroup variant="flush">
            {data.getStudentCourseABC.history
              .map(({ date, alphabet }) => (
                <ListGroup.Item key={date}>
                  <div>{new Date(Number(date)).toDateString()}</div>
                  <Alphabet letters={alphabet} />
                </ListGroup.Item>
              ))
              .reverse()}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
