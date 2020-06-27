import { testRenderer } from '../../../../test/testHelper'
import Alphabet from '../../Alphabet/Alphabet'

describe('<Alphabet>', () => {
  const lettersMock = 'abcdefghijklnmopqrstuvwxyz'.split('').map((letter) => ({
    letter: letter,
    value: 0,
  }))

  describe('@Render', () => {
    it('Should render alphabet', () => {
      const props = {
        letters: lettersMock,
        update: jest.fn(),
      }
      const wrapper = testRenderer(Alphabet, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('@Event', () => {
    describe('@onClick', () => {
      it('should trigger an update prop', () => {
        const props = {
          letters: lettersMock,
          update: jest.fn(),
        }
        const wrapper = testRenderer(Alphabet, props)
        wrapper.find('Letter').get(0).props.update()
        expect(props.update).toHaveBeenCalledTimes(1)
      })
    })
  })
})
