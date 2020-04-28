import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import MyAccount from '../../MyAccount/MyAccount'
import { getUserDetailsQuerySuccess } from '../../../../test/mockApi/user/userMockQuery'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<MyAccount>', () => {
  it('Should render', async () => {
    let wrapper
    await act(async () => {
      wrapper = graphRenderer(MyAccount, [getUserDetailsQuerySuccess], {})
      await delay()
    })
    wrapper.update()
    expect(wrapper.find(MyAccount)).toMatchSnapshot()
  })
})
