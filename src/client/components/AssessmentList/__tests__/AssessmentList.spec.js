import { testRenderer } from '../../../../test/testHelper'
import AssessmentList from '../AssessmentList'
import { ASSESSMENT_LIST } from '../AssessmentList.defaultState'

describe('<AssessmentList>', () => {
  describe('@Render', () => {
    it('should render all assessments', () => {
      const props = {
        assessments: [],
      }
      const wrapper = testRenderer(AssessmentList, props)
      expect(wrapper.find('AssessmentCard')).toHaveLength(4)
      wrapper.find('AssessmentCard').forEach((ele) => {
        expect(ASSESSMENT_LIST).toContain(ele.props().assessment)
      })
    })

    it('should not render assessment if provided in props', () => {
      const props = {
        assessments: ['alphabet-upperCase'],
      }
      const wrapper = testRenderer(AssessmentList, props)
      expect(wrapper.find('AssessmentCard')).toHaveLength(3)
      wrapper.find('AssessmentCard').forEach((ele) => {
        expect(ASSESSMENT_LIST[0]).not.toEqual(ele.props().assessment)
      })
    })
  })
})
