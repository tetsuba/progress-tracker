import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import AlphabetForm from '../AlphabetForm'
import { saveAlphabetAssessmentMutationSuccess } from '../../../../test/mockApi/assessment/alphabet/alphabetMockMutation'
import { getAlphabetAssessmentQuerySuccess } from '../../../../test/mockApi/assessment/alphabet/alphabetMockQuery'

describe('<AlphabetForm>', () => {
  const mockData = {
    getAlphabetAssessment: {
      history: [],
    },
  }

  const props = {
    type: 'upperCase',
    id: 'userId001',
    toggleModal: jest.fn(),
    data: mockData,
  }

  it('Should render a default state', async () => {
    let wrapper
    await act(async () => {
      wrapper = graphRenderer(
        AlphabetForm,
        [
          saveAlphabetAssessmentMutationSuccess,
          getAlphabetAssessmentQuerySuccess,
        ],
        props
      )
      await delay()
    })
    wrapper.update()
    expect(wrapper.find(AlphabetForm)).toMatchSnapshot()
  })

  it('Should close the modal when submitting an assessment', async () => {
    let wrapper
    await act(async () => {
      wrapper = graphRenderer(
        AlphabetForm,
        [
          saveAlphabetAssessmentMutationSuccess,
          getAlphabetAssessmentQuerySuccess,
        ],
        props
      )
      await delay()
    })
    wrapper.update()
    await act(async () => {
      wrapper.find('Button').props().onClick()
      await delay()
    })
    wrapper.update()
    expect(props.toggleModal).toHaveBeenCalledTimes(1)
  })
})
