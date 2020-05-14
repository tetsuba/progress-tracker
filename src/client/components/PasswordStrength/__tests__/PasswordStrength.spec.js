import { testRenderer } from '../../../../test/testHelper'
import PasswordStrength from '../PasswordStrength'

describe('<PasswordStrength>', () => {
  it('should render password strength "Bad" and variant is "danger"', () => {
    const props = {
      password: '1234',
    }
    const wrapper = testRenderer(PasswordStrength, props)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render password strength "Weak" and variant is "warning"', () => {
    const props = {
      password: '1234asdf',
    }
    const wrapper = testRenderer(PasswordStrength, props)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render password strength "Good" and variant is "info"', () => {
    const props = {
      password: 'J@hn2102',
    }
    const wrapper = testRenderer(PasswordStrength, props)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render password strength "Strong" and variant is "info"', () => {
    const props = {
      password: '1hG6$d$Rdf',
    }
    const wrapper = testRenderer(PasswordStrength, props)
    expect(wrapper).toMatchSnapshot()
  })
})
