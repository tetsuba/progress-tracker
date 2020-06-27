import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// COMPONENTS
import AssessmentList from '../../components/AssessmentList/AssessmentList'
import StudentAssessmentList from './StudentAssessmentList'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { CRUMBS_KEY } from '../../components/BreadCrumbs/crumbs'

// QUERIES
import { STUDENT_QUERY } from '../../api/student/student.query'

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
        <h3>Assessments:</h3>
      </Row>
      {id && (
        <StudentAssessmentList
          assessments={data.getStudent.assessments}
          id={id}
        />
      )}
      <Row className="mt-5">
        <h3>Available assessments:</h3>
      </Row>
      <AssessmentList assessments={data.getStudent.assessments} />
    </Container>
  )
}
