import { testRendererFull } from '../../../../test/testHelper'
import StudentAssessmentList from '../StudentAssessmentList'
import { ASSESSMENT_LIST } from '../../../components/AssessmentList/AssessmentList.defaultState'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))

describe('<StudentAssessmentList>', () => {
  describe('@Render', () => {
    it('Should render all assessments', () => {
      const props = {
        assessments: ASSESSMENT_LIST.map(({ assessmentId }) => assessmentId),
        id: 'studentId01',
      }
      const wrapper = testRendererFull(StudentAssessmentList, props)

      expect(wrapper.find('ListGroupItem')).toHaveLength(
        props.assessments.length
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
