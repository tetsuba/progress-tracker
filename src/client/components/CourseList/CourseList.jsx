import React from 'react'
import { CardDeck } from 'react-bootstrap'

// COMPONENTS
import CourseCard from '../CourseCard/CourseCard'

// DEFAULT STATE
import { COURSE_LIST, COURSE_NOT_FOUND } from './CourseList.defaultState'

// TYPES
import type { CourseType } from './CourseList.types'

export function findCourseDetails(courseName: string, id: string): CourseType {
  const course = COURSE_LIST.find(({ title }) => title === courseName)
  return course
    ? {
        ...course,
        path: course.path.replace('{id}', id),
      }
    : COURSE_NOT_FOUND
}

function getCoursesNotActive(courses: Array<string>): Array<CourseType> {
  return COURSE_LIST.filter(({ title }) => !courses.includes(title))
}

type Props = {
  courses: Array<string>,
}
export default function CourseList(props: Props) {
  const { courses } = props
  const coursesNotActive = getCoursesNotActive(courses)
  return (
    <CardDeck className="mt-5">
      {coursesNotActive.map((courseProps, index) => (
        <CourseCard key={`card-${index}`} course={courseProps} />
      ))}
    </CardDeck>
  )
}
