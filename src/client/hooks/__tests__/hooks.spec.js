import * as React from 'react'
import { useInputChange, useLocalStorage } from '../hooks'
import { testRenderer } from '../../../test/testHelper'

describe('hooks', () => {
  describe('useLocalStorage', () => {
    const localStorageBackup = window.localStorage
    const keyValue = 'keyMock'

    const TestComponent = () => {
      const [setLocalStorage, value] = useLocalStorage('key')
      return (
        <>
          <p>{value}</p>
          <button onClick={() => setLocalStorage(keyValue)}>Click</button>
        </>
      )
    }

    afterAll(() => {
      window.localStorage = localStorageBackup
    })

    it('sets "value" to null if key has not been saved to local storage', () => {
      const wrapper = testRenderer(TestComponent, {})
      expect(wrapper.find('p').props().children).toEqual(null)
    })

    it('sets "value" when "setLocalStorage" is triggered', () => {
      const wrapper = testRenderer(TestComponent, {})
      wrapper.find('button').props().onClick()
      expect(wrapper.find('p').props().children).toEqual(keyValue)
    })
  })

  describe('useInputChange', () => {
    const TestComponent = () => {
      const [inputs, setValue] = useInputChange({
        firstName: '',
      })
      return (
        <>
          <input
            name="firstName"
            value={inputs.firstName}
            onChange={setValue}
          />
        </>
      )
    }

    it('should update "inputs" value', () => {
      const wrapper = testRenderer(TestComponent, {})
      expect(wrapper.find('input').props().value).toEqual('')

      wrapper
        .find('input')
        .props()
        .onChange({
          target: {
            name: 'firstName',
            value: 'Bob',
          },
        })

      expect(wrapper.find('input').props().value).toEqual('Bob')
    })
  })
})
