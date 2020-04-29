import { useState } from 'react'

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key)
  })

  function setLocalStorage(value) {
    window.localStorage.setItem(key, value)
    setValue(value)
  }
  return [setLocalStorage, value]
}

export function useInputChange(data) {
  const [inputs, setInputs] = useState(data)

  function setValue(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  return [inputs, setValue]
}

export function useSuccess(name) {
  const [value, setValue] = useState('')

  function setSuccess({ data }) {
    setValue(data[name].confirmation)
  }
  return [value, setSuccess]
}

export function useError(state) {
  const [value, setValue] = useState(state)

  function setError(error) {
    const message = error.graphQLErrors[0].message
    setValue({ message })
  }
  return [value, setError]
}
