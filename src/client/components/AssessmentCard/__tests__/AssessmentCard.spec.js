import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import AssessmentCard from '../AssessmentCard'
import { addAssessmentMutationSuccess } from '../../../../test/mockApi/assessment/assessmentMockMutation'
import { getStudentQuerySuccess } from '../../../../test/mockApi/student/studentMockQuery'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ id: 'studentId001' }),
}))

describe('<AssessmentCard>', () => {
  describe('@Render', () => {
    const props = {
      assessment: {
        title: 'Assessment Title',
        description: 'description',
        assessmentId: 'alphabet-upperCase',
      },
    }
    it('Should render a default state', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          AssessmentCard,
          [addAssessmentMutationSuccess, getStudentQuerySuccess],
          props
        )
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(AssessmentCard)).toMatchSnapshot()
    })
  })
})
