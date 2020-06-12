import React from 'react'

// TYPES
import type { AlphabetType } from './Alphabet.type'

type Props = {
  update?: ((state: Array<AlphabetType>) => Array<AlphabetType>) => void,
  key?: ?string,
}

export default function Letter(props: Props & AlphabetType) {
  const { letter, value, update } = props
  let colour
  let bgColour
  switch (value) {
    case 1:
      bgColour = '#309c3f'
      colour = '#FFF'
      break
    case 2:
      bgColour = '#e33f3f'
      colour = '#FFF'
      break
    default:
      bgColour = '#fff'
      colour = '#000'
  }

  const styles = {
    width: !update ? 'auto' : '80px',
    height: !update ? 'auto' : '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px #000',
    fontSize: !update ? '14px' : '42px',
    margin: '4px',
    color: colour,
    backgroundColor: bgColour,
    padding: !update ? '8px' : '',
    cursor: 'pointer',
  }

  function updateLetter(state: Array<AlphabetType>): Array<AlphabetType> {
    function updateValue(value: number) {
      return value >= 2 ? 0 : (value += 1)
    }

    return state.map((obj) => ({
      ...obj,
      value: obj.letter === letter ? updateValue(obj.value) : obj.value,
    }))
  }

  return (
    <div style={styles} onClick={() => update && update(updateLetter)}>
      {letter}
    </div>
  )
}
