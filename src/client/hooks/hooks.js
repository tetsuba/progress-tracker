import { useState } from 'react'
import type { eventType } from '../types/eventType'
import type { implicitObjectString } from '../types/commonTypes'

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key)
  })

  function setLocalStorage(value: string) {
    window.localStorage.setItem(key, value)
    setValue(value)
  }
  return [setLocalStorage, value]
}

export function useInputChange(
  data: implicitObjectString
): [implicitObjectString, (e: eventType) => void] {
  const [inputs, setInputs] = useState(data)

  function setValue(e: eventType): void {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  return [inputs, setValue]
}
