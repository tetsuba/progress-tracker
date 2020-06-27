import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import Student from '../Student'
import {
  getStudentQuerySuccess,
  getStudentWithNoAssessmentsQuerySuccess,
} from '../../../../test/mockApi/student/studentMockQuery'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 'studentId001' })),
  useHistory: jest.fn(),
  Link: ({ children }) => children,
}))

describe('Student', () => {
  describe('@Render', () => {
    it('should render default state', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          Student,
          [getStudentWithNoAssessmentsQuerySuccess],
          {}
        )
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(Student)).toMatchSnapshot()
    })

    it('should render student with no assessments selected', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          Student,
          [getStudentWithNoAssessmentsQuerySuccess],
          {}
        )
        await delay()
      })
      wrapper.update()

      expect(wrapper.find('StudentAssessmentList ListGroupItem')).toHaveLength(
        0
      )
      expect(wrapper.find('AssessmentList AssessmentCard')).toHaveLength(4)
    })

    it('Should render student with an assessments selected', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(Student, [getStudentQuerySuccess], {})
        await delay()
      })
      wrapper.update()

      expect(wrapper.find('StudentAssessmentList ListGroupItem')).toHaveLength(
        1
      )
      expect(wrapper.find('AssessmentList AssessmentCard')).toHaveLength(3)
    })
  })
})
