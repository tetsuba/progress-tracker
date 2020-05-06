import { act } from 'react-dom/test-utils'
import {
  delay,
  graphRenderer,
  updateTextInput,
} from '../../../../test/testHelper'

import AddStudentForm from '../AddStudentForm'
import {
  addNewStudentMutationSuccess,
  getStudentsQuerySuccess,
} from '../../../../test/mockApi/student/studentMockMutation'

describe('<AddStudentForm>', () => {
  describe('@Render', () => {
    it('should render', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(AddStudentForm, [], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(AddStudentForm)).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onSubmit', () => {
      it('should call "toggleModal"', async () => {
        const props = {
          toggleModal: jest.fn(),
        }

        const wrapper = graphRenderer(
          AddStudentForm,
          [addNewStudentMutationSuccess, getStudentsQuerySuccess],
          props
        )

        act(() => {
          updateTextInput(wrapper, 'firstName', 'John')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'lastName', 'Doh')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'DOB', 'date')
        })

        wrapper.update()

        await act(async () => {
          await wrapper.find('#AddStudentForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
          await delay()
        })

        wrapper.update()

        expect(props.toggleModal).toHaveBeenCalledTimes(1)
      })
    })
  })
})
