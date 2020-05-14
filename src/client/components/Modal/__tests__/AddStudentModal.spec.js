import { testRenderer } from '../../../../test/testHelper'
import AddStudentModal from '../AddStudentModal'

describe('<AddStudentModal>', () => {
  it('should render', () => {
    const wrapper = testRenderer(AddStudentModal, {})
    expect(wrapper).toMatchSnapshot()
  })
})
