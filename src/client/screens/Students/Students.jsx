import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'

// COMPONENTS
// $FlowFixMe - Investigate how to fix flow errors
import AddStudentModal from '../../components/Modal/AddStudentModal'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { CRUMBS_KEY } from '../../components/BreadCrumbs/crumbs'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// CONTEXT
// $FlowFixMe - Investigate how to fix flow errors
import { ModalContext } from '../../context/ModalContext'

// QUERY
import { STUDENTS_QUERY } from '../../api/student/student.query'

export default function Students() {
  // $FlowFixMe - Graphql investigate how to fix
  const { loading, data } = useQuery(STUDENTS_QUERY)
  const { toggleModal, addTemplate } = useContext(ModalContext)

  useEffect(() => {
    addTemplate(AddStudentModal)
  }, [addTemplate])

  const renderList = (students) =>
    students.map((student) => (
      <Link
        to={`/student/${student._id}`}
        key={student._id}
        className="list-group-item"
      >
        {student.firstName} {student.lastName}
      </Link>
    ))

  return (
    <Container>
      <Row className="mt-5">
        <BreadCrumbs crumbKey={CRUMBS_KEY.STUDENTS} />
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>My Students</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Button
            className="float-right"
            variant="primary"
            onClick={() => toggleModal()}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Student
          </Button>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <ListGroup>{!loading && renderList(data.students)}</ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
