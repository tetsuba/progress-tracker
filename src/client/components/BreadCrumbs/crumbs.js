export const CRUMBS_KEY = {
  MY_ACCOUNT: 'myAccount',
  STUDENTS: 'Students',
  STUDENT: 'Student',
  ALPHABET: 'Alphabet',
}

const PATH = {
  HOME: { path: '/', name: 'Home' },
  MY_ACCOUNT: { path: '/myAccount', name: 'My Account' },
  STUDENTS: { path: '/students', name: 'Students' },
  STUDENT: { path: '/student/{id}', name: 'Student', id: true, replace: true },
  ALPHABET: {
    path: '/student/{id}/assessment/Alphabet',
    name: 'Alphabet',
    id: true,
  },
}

export default {
  [CRUMBS_KEY.MY_ACCOUNT]: [PATH.HOME, PATH.MY_ACCOUNT],
  [CRUMBS_KEY.STUDENTS]: [PATH.HOME, PATH.STUDENTS],
  [CRUMBS_KEY.STUDENT]: [PATH.HOME, PATH.STUDENTS, PATH.STUDENT],
  [CRUMBS_KEY.ALPHABET]: [
    PATH.HOME,
    PATH.STUDENTS,
    PATH.STUDENT,
    PATH.ALPHABET,
  ],
}
