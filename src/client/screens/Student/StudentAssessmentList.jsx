import React from 'react'
import { useHistory } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { findAssessmentDetails } from '../../components/AssessmentList/AssessmentList'

type Props = {
  assessments: [string],
  id: string,
}

export default function StudentAssessmentList(props: Props) {
  const { assessments, id } = props
  const history = useHistory()

  return (
    <ListGroup>
      {assessments.map((assessment) => {
        const { title, path } = findAssessmentDetails(assessment, id)
        return (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            key={title}
            onClick={() => history.push(path)}
          >
            {title}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}
