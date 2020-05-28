import gql from 'graphql-tag'

export const SAVE_COURSE_PROGRESS_MUTATION = gql`
  mutation SaveCourseProgress($input: CourseABCInput!) {
    saveCourseProgress(input: $input) {
      studentName
      history {
        date
        alphabet {
          letter
          value
        }
      }
    }
  }
`
