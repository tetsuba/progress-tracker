import { graphRenderer } from '../../../../test/testHelper'

// COMPONENTS
import MyDetailsForm from '../MyDetailsForm'
import { act } from 'react-dom/test-utils'

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
      const wrapper = graphRenderer(MyDetailsForm, [], baseProps)
      expect(wrapper.find(MyDetailsForm)).toMatchSnapshot()
    })

    describe('User clicks on "Edit" button', () => {
      it('should render form available to edit', () => {
        // Input forms will not be read only
        // Edit button will be hidden
        // Cancel and Save buttons will be visible
        const wrapper = graphRenderer(MyDetailsForm, [], baseProps)
        act(() => {
          wrapper.find('button#MyDetailsFormEdit').props().onClick()
        })

        expect(wrapper.find(MyDetailsForm)).toMatchSnapshot()
      })
    })
  })

  describe.skip('@Events', () => {
    describe('onSubmit', () => {
      it('should', () => {})
    })
  })
})
