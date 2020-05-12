import * as React from 'react'

import { graphRenderer } from '../../../test/testHelper'
import AuthenticatedContext from '../AuthenticatedContext'
import { isUserSessionExpiredQuerySuccess } from '../../../test/mockApi/user/userMockQuery'

describe.skip('AuthenticatedContext', () => {
  const TestComponent = () => {
    const { authenticated, toggle } = React.useContext(AuthenticatedContext)
    return (
      <>
        <p>{authenticated}</p>
        <button onClick={toggle}> hide </button>
      </>
    )
  }

  it('sets authenticated to true and then to false', async () => {
    let wrapper = graphRenderer(
      TestComponent,
      [isUserSessionExpiredQuerySuccess],
      {}
    )
    // act(() => {
    //
    //   // await delay()
    // })

    // expect(wrapper.find('p').props().children).toBeFalsy()
    console.log(wrapper.find('p').props().children)
    wrapper.update()
    console.log(wrapper.find('p').props().children)
  })

  // it('sets authenticated to true and then to false', async () => {
  //   const wrapper = testRendererWithGlobalContext(TestComponent)
  //   expect(wrapper.find('p').props().children).toBeFalsy()
  //   act(() => {
  //     wrapper.find('button').get(0).props.onClick()
  //   })
  //   wrapper.update()
  //   expect(wrapper.find('p').props().children).toBeTruthy()
  //
  //   await act(async () => {
  //     wrapper.find('button').get(1).props.onClick()
  //     await delay(300)
  //   })
  //
  //   wrapper.update()
  //   expect(wrapper.find('p').props().children).toBeFalsy()
  // })
})
