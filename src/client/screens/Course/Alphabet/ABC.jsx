import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'

// COMPONENTS
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import Alphabet from '../../../components/Alphabet/Alphabet'
import { CRUMBS_KEY } from '../../../components/BreadCrumbs/crumbs'
import Histogram from '../../../components/Chart/Histogram/Histogram'
import AlphabetModal from '../../../components/Modal/AlphabetModal'

// CONTEXT
import { ModalContext } from '../../../context/ModalContext'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// QUERIES
import { GET_STUDENT_COURSE_ABC } from '../../../api/course/courseABC/courseABC.query'
import { formatDataForHistogram } from './alphabet-utils'

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
  const { toggleModal, addTemplate } = useContext(ModalContext)

  useEffect(() => {
    addTemplate(AlphabetModal, { id: id, data: data })
  }, [addTemplate, data, id])

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
        <h1>Alphabet (lowercase) assessment</h1>
      </Row>

      <Button
        className="float-right"
        variant="primary"
        onClick={() => toggleModal()}
      >
        <FontAwesomeIcon icon={faPlus} /> Add assessment
      </Button>
      <Row className="mt-5">
        <Col>
          <Histogram data={formatDataForHistogram(data)} />
        </Col>
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
