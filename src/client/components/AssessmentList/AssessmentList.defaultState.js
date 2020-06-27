import type { AssessmentType } from './AssessmentList.types'

export const ASSESSMENT_LIST: Array<AssessmentType> = [
  {
    assessmentId: 'alphabet-upperCase',
    description: 'Upper case letter assessment',
    path: `/student/{id}/assessment/alphabet-upperCase`,
    title: 'Alphabet Uppercase',
  },
  {
    assessmentId: 'alphabet-lowerCase',
    description: 'Lower case letter assessment',
    path: `/student/{id}/assessment/alphabet-lowerCase`,
    title: 'Alphabet Lowercase',
  },
  {
    assessmentId: 'alphabet-names',
    description: 'Name the letters assessment',
    path: `/student/{id}/assessment/alphabet-names`,
    title: 'Alphabet Names',
  },
  {
    assessmentId: 'alphabet-sounds',
    description: 'Make the letter sounds assessment',
    path: `/student/{id}/assessment/alphabet-sounds`,
    title: 'Alphabet Sounds',
  },
]

export const ASSESSMENT_NOT_FOUND = {
  assessmentId: 'assessment-not-found',
  description: 'Assessment not found',
  path: '',
  title: 'Assessment not found',
}
