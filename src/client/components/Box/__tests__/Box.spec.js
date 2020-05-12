import { testRendererFull } from '../../../../test/testHelper'
import Box from '../Box'

describe('<Box>', () => {
  const props = {
    max: 500,
    className: 'mt-5',
  }

  it('should render', () => {
    const wrapper = testRendererFull(Box, props)
    expect(wrapper).toMatchSnapshot()
  })
})
