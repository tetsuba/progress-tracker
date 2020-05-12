import { testRendererFull } from '../../../../test/testHelper'
import Box from '../Box'

describe('<Box>', () => {
  it('should render with a max width of 500px', () => {
    const props = {
      max: 500,
    }
    const wrapper = testRendererFull(Box, props)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with a class name', () => {
    const props = {
      max: 500,
      className: 'mt-5',
    }
    const wrapper = testRendererFull(Box, props)
    expect(wrapper).toMatchSnapshot()
  })
})
