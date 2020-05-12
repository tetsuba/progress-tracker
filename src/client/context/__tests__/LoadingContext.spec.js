import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { LoadingContext } from '../LoadingContext'
import { delay, testRendererWithGlobalContext } from '../../../test/testHelper'

describe('LoadingContext', () => {
  const TestComponent = () => {
    const { loading, showLoading, hideLoading } = React.useContext(
      LoadingContext
    )
    return (
      <>
        <p>{loading}</p>
        <button onClick={showLoading}> show </button>
        <button onClick={hideLoading}> hide </button>
      </>
    )
  }

  it('sets loading to true and then to false', async () => {
    const wrapper = testRendererWithGlobalContext(TestComponent)
    expect(wrapper.find('p').props().children).toBeFalsy()
    act(() => {
      wrapper.find('button').get(0).props.onClick()
    })
    wrapper.update()
    expect(wrapper.find('p').props().children).toBeTruthy()

    await act(async () => {
      wrapper.find('button').get(1).props.onClick()
      await delay(300)
    })

    wrapper.update()
    expect(wrapper.find('p').props().children).toBeFalsy()
  })
})
