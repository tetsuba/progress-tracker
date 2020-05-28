import React from 'react'
import { useHistory } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { findCourseDetails } from '../../components/CourseList/CourseList'

type Props = {
  courses: [string],
  id: string,
}

export default function StudentCourseList(props: Props) {
  const { courses, id } = props
  const history = useHistory()
  return (
    <ListGroup>
      {courses.map((course) => {
        const { title, path } = findCourseDetails(course, id)
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
