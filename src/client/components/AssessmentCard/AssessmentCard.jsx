import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button, Col } from 'react-bootstrap'

// MUTATIONS
import { ADD_ASSESSMENT_MUTATION } from '../../api/assessment/assessment.mutation'

// QUERIES
import { STUDENT_QUERY } from '../../api/student/student.query'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// TYPES
import type { AssessmentType } from '../AssessmentList/AssessmentList.types'

type Props = {
  assessment: AssessmentType,
}

export default function AssessmentCard(props: Props) {
  const { title, description, assessmentId } = props.assessment
  const { id }: { id?: ?string } = useParams()
  const variables = {
    input: {
      id: id,
    },
  }
  const [addAssessment] = useMutation(ADD_ASSESSMENT_MUTATION, {
    refetchQueries: [{ query: STUDENT_QUERY, variables }],
  })

  return (
    <Col sm={4} key={title}>
      <div className="card text-body text-decoration-none">
        <div className="card-header">
          <h5>{title}</h5>
        </div>
        <div className="card-body">{description}</div>
        <div className="card-footer">
          <Button
            className="float-right"
            variant="primary"
            onClick={() => {
              const options = {
                variables: {
                  input: {
                    studentId: id,
                    assessmentName: assessmentId,
                  },
                },
              }
              addAssessment(options).catch(() => console.log('error!'))
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Assessment
          </Button>
        </div>
      </div>
    </Col>
  )
}
