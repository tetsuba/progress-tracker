import type { CourseType } from './CourseList.types'

export const COURSE_LIST: Array<CourseType> = [
  {
    title: 'ABC',
    description: 'Keep track of the progress of the ABC',
    path: `/student/{id}/course/ABC`,
  },
  {
    title: 'Alphabet-writing',
    description: 'Keep track of the progress of the ABC',
    path: `/student/{id}/course/Alphabet-writing`,
  },
]

export const COURSE_NOT_FOUND = {
  title: 'Course not found',
  description: 'Course not found',
  path: '',
}
