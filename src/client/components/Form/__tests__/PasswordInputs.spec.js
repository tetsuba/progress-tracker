import { testRenderer } from '../../../../test/testHelper'
import PasswordInputs from '../PasswordInputs'

describe('<PasswordInputs>', () => {
  const baseProps = {
    setInputs: jest.fn(),
    inputs: {
      newPassword: '',
      confirmPassword: '',
    },
  }

  describe('@Render', () => {
    it('should render', () => {
      const props = {
        ...baseProps,
      }
      const wrapper = testRenderer(PasswordInputs, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
