// TODO: update types
type Props = {
  getStudentCourseABC: any,
}

export function formatDefaultState(data: Props) {
  const eof = data.getStudentCourseABC.history.length - 1
  const state = data.getStudentCourseABC.history[eof].alphabet
  return state.map(({ letter, value }) => ({ letter, value }))
}
