import React from 'react'

// COMPONENTS
import Letter from './Letter'

// TYPES
import type { AlphabetType } from './Alphabet.type'

type Props = {
  letters: Array<AlphabetType>,
  update?: ((state: Array<AlphabetType>) => Array<AlphabetType>) => void,
}

export default function Alphabet(props: Props) {
  const { letters, update } = props
  return (
    <div style={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap' }}>
      {letters.map(({ letter, value }) => (
        <Letter
          key={`${letter}-letter`}
          letter={letter}
          value={value}
          update={update}
        />
      ))}
    </div>
  )
}
