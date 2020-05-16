import Header from '../Header'
import { mount } from 'enzyme'
import * as React from 'react'
import { AuthenticatedContext } from '../../../context/AuthenticatedContext'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<Header>', () => {
  it('should render specific header links for a unauthorised user ', () => {
    const wrapper = mount(
      <AuthenticatedContext.Provider value={{ authenticated: false }}>
        <Header />
      </AuthenticatedContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render specific header links for an authorised user ', () => {
    const wrapper = mount(
      <AuthenticatedContext.Provider value={{ authenticated: true }}>
        <Header />
      </AuthenticatedContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
