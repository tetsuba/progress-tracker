import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// QUERIES
import { STUDENT_QUERY } from '../../api/student/student.query'

// COMPONENTS
import CourseList from '../../components/CourseList/CourseList'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { CRUMBS_KEY } from '../../components/BreadCrumbs/crumbs'
import StudentCourseList from './StudentCourseList'

export default function Student() {
  const { id }: { id?: ?string } = useParams()
  const options = {
    variables: {
      input: {
        id: id || '',
      },
    },
  }

  // $FlowFixMe -
  const { loading, data } = useQuery(STUDENT_QUERY, options)

  if (loading) return <div>LOADING</div>

  return (
    <Container>
      <Row className="mt-5">
        <BreadCrumbs
          crumbKey={CRUMBS_KEY.STUDENT}
          name={data.getStudent.firstName}
          id={id}
        />
      </Row>
      <Row className="mt-5">
        <h3>Courses:</h3>
      </Row>
      {id && <StudentCourseList courses={data.getStudent.courses} id={id} />}
      <Row className="mt-5">
        <h3>Available courses:</h3>
      </Row>
      <CourseList courses={data.getStudent.courses} />
    </Container>
  )
}
