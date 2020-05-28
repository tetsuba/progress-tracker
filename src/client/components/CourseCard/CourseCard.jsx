import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button, Col } from 'react-bootstrap'

// MUTATIONS
import { ADD_STUDENT_STUDENT_MUTATION } from '../../api/student/student.mutation'

// QUERIES
import { STUDENT_QUERY } from '../../api/student/student.query'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// TYPES
import type { CourseType } from '../CourseList/CourseList.types'

type Props = {
  course: CourseType,
}

export default function CourseCard(props: Props) {
  const { title, description } = props.course
  const { id }: { id?: ?string } = useParams()
  const variables = {
    input: {
      id: id,
    },
  }
  const [addStudentCourse] = useMutation(ADD_STUDENT_STUDENT_MUTATION, {
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
                    courseName: title,
                  },
                },
              }
              addStudentCourse(options).catch(() => console.log('error!'))
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Course
          </Button>
        </div>
      </div>
    </Col>
  )
}
