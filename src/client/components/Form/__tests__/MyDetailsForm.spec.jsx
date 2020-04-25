import { testRenderer } from '../../../../test/testHelper'

// COMPONENTS
import MyDetailsForm from '../MyDetailsForm'

describe('<MyDetailsForm>', () => {
  const baseProps = {
    handleSubmit: jest.fn(),
    user: {
      firstName: 'Bob',
      lastName: 'Doh',
    },
  }

  describe('@Render', () => {
    it('should render default state which is not available to edit', () => {
      // Input forms will be read only
      // Edit button will be visible
      const wrapper = testRenderer(MyDetailsForm, baseProps)
      expect(wrapper).toMatchSnapshot()
    })

    describe('User clicks on "Edit" button', () => {
      it('should render form available to edit', () => {
        // Input forms will not be read only
        // Edit button will be hidden
        // Cancel and Save buttons will be visible
        const wrapper = testRenderer(MyDetailsForm, baseProps)
        wrapper.find('#MyDetailsFormEdit').simulate('click')
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('@Events', () => {
    describe('onChange', () => {
      it('should update firstName input', () => {
        const wrapper = testRenderer(MyDetailsForm, baseProps)
        const firstName = { name: 'firstName' }
        const expected = 'Bob'

        wrapper.find(firstName).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'firstName',
            value: 'Bob',
          },
        })

        expect(wrapper.find(firstName).prop('value')).toEqual(expected)
      })

      it('should update lastName input', () => {
        const wrapper = testRenderer(MyDetailsForm, baseProps)
        const password = { name: 'lastName' }
        const expected = 'Doh'

        wrapper.find(password).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'lastName',
            value: 'Doh',
          },
        })
        expect(wrapper.find(password).prop('value')).toEqual(expected)
      })
    })

    describe('onSubmit', () => {
      it('should trigger handleSubmit', () => {
        const wrapper = testRenderer(MyDetailsForm, baseProps)
        const id = '#MyDetailsForm'
        wrapper.find(id).props().onSubmit({ preventDefault: jest.fn() })
        expect(baseProps.handleSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })
})
