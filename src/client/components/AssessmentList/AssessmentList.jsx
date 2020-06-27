import React from 'react'
import { CardDeck } from 'react-bootstrap'

// COMPONENTS
import AssessmentCard from '../AssessmentCard/AssessmentCard'

// DEFAULT STATE
import {
  ASSESSMENT_LIST,
  ASSESSMENT_NOT_FOUND,
} from './AssessmentList.defaultState'

// TYPES
import type { AssessmentType } from './AssessmentList.types'

export function findAssessmentDetails(
  assessmentName: string,
  id: string
): AssessmentType {
  const assessment = ASSESSMENT_LIST.find(
    ({ assessmentId }) => assessmentId === assessmentName
  )
  return assessment
    ? {
        ...assessment,
        path: assessment.path.replace('{id}', id),
      }
    : ASSESSMENT_NOT_FOUND
}

function getAssessmentsNotActive(
  assessments: Array<string>
): Array<AssessmentType> {
  return ASSESSMENT_LIST.filter(
    ({ assessmentId }) => !assessments.includes(assessmentId)
  )
}

type Props = {
  assessments: Array<string>,
}
export default function AssessmentList(props: Props) {
  const { assessments } = props
  const assessmentsNotActive = getAssessmentsNotActive(assessments)

  return (
    <CardDeck className="mt-5">
      {assessmentsNotActive.map((assessmentProps, index) => (
        <AssessmentCard key={`card-${index}`} assessment={assessmentProps} />
      ))}
    </CardDeck>
  )
}
