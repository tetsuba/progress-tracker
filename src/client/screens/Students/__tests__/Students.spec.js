import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import Students from '../Students'
import { getStudentsQuerySuccess } from '../../../../test/mockApi/student/studentMockQuery'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('Students', () => {
  describe('@Render', () => {
    it('Should render', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(Students, [getStudentsQuerySuccess], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(Students)).toMatchSnapshot()
    })
  })
})
