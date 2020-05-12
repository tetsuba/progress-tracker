import { mount } from 'enzyme'
import Loading from '../Loading'
import * as React from 'react'
import { LoadingContext } from '../../../context/LoadingContext'

describe('<Loading>', () => {
  it('should render loading screen', () => {
    const wrapper = mount(
      <LoadingContext.Provider value={{ loading: true }}>
        <Loading />
      </LoadingContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should render nothing', () => {
    const wrapper = mount(
      <LoadingContext.Provider value={{ loading: false }}>
        <Loading />
      </LoadingContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
