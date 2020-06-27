import { testRenderer } from '../../../../test/testHelper'
import Letter from '../Letter'

describe('<Letter>', () => {
  describe('@Render', () => {
    it('should render background colour "White"', () => {
      const props = {
        update: jest.fn(),
        key: '',
        letter: 'a',
        value: 0,
      }
      const wrapper = testRenderer(Letter, props)
      expect(wrapper.props().style.backgroundColor).toEqual('#fff')
    })

    it('should render background colour "Green"', () => {
      const props = {
        update: jest.fn(),
        key: '',
        letter: 'a',
        value: 1,
      }
      const wrapper = testRenderer(Letter, props)
      expect(wrapper.props().style.backgroundColor).toEqual('#309c3f')
    })

    it('should render background colour "Red"', () => {
      const props = {
        update: jest.fn(),
        key: '',
        letter: 'a',
        value: 2,
      }
      const wrapper = testRenderer(Letter, props)
      expect(wrapper.props().style.backgroundColor).toEqual('#e33f3f')
    })
  })

  describe('@Event', () => {
    describe('onClick', () => {
      it('should trigger an update prop', () => {
        const props = {
          update: jest.fn(),
          key: '',
          letter: 'a',
          value: 2,
        }
        const wrapper = testRenderer(Letter, props)
        wrapper.props().onClick()
        expect(props.update).toHaveBeenCalledTimes(1)
      })
    })
  })
})
