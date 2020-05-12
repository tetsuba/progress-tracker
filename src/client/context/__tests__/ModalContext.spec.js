import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { ModalContext } from '../ModalContext'
import { testRendererWithGlobalContext } from '../../../test/testHelper'

describe('ModalContext', () => {
  const TestModalTemplate = () => {
    return <div>Modal template</div>
  }

  const TestComponent = () => {
    const {
      show,
      addTemplate,
      hideModal,
      toggleModal,
      ModalTemplate,
    } = React.useContext(ModalContext)
    return (
      <>
        <p>{show}</p>
        <button onClick={toggleModal}> hide </button>
        <button onClick={() => addTemplate(TestModalTemplate)}> show </button>
        <button onClick={hideModal}> hide </button>
        {ModalTemplate && <ModalTemplate />}
      </>
    )
  }

  it('sets "show" status to true and then false', () => {
    const wrapper = testRendererWithGlobalContext(TestComponent)
    expect(wrapper.find('p').props().children).toBeFalsy()
    act(() => {
      wrapper.find('button').get(0).props.onClick()
    })
    wrapper.update()
    expect(wrapper.find('p').props().children).toBeTruthy()

    act(() => {
      wrapper.find('button').get(0).props.onClick()
    })

    wrapper.update()
    expect(wrapper.find('p').props().children).toBeFalsy()
  })

  it('saves a template to "ModalTemplate"', () => {
    const wrapper = testRendererWithGlobalContext(TestComponent)
    expect(wrapper.find('div')).toHaveLength(0)

    act(() => {
      wrapper.find('button').get(1).props.onClick()
    })
    wrapper.update()
    expect(wrapper.find('div').props().children).toEqual('Modal template')
  })

  it('sets show to false', () => {
    const wrapper = testRendererWithGlobalContext(TestComponent)
    act(() => {
      wrapper.find('button').get(0).props.onClick()
    })
    wrapper.update()
    act(() => {
      wrapper.find('button').get(2).props.onClick()
    })
    wrapper.update()
    expect(wrapper.find('p').props().children).toBeFalsy()
  })
})
