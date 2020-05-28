import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import Student from '../Student'
import { getStudentQuerySuccess } from '../../../../test/mockApi/student/studentMockQuery'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 'studentId001' })),
  useHistory: jest.fn(),
}))

describe.skip('Student', () => {
  describe('@Render', () => {
    it('Should render', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(Student, [getStudentQuerySuccess], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(Student)).toMatchSnapshot()
    })
  })
})
