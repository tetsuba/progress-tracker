import React from 'react'

// COMPONENTS
import Letter from './Letter'

// TYPES
import type { AlphabetType } from './Alphabet.type'

type Props = {
  letters: Array<{ letter: string, value: number }>,
  update?: ((state: Array<AlphabetType>) => Array<AlphabetType>) => void,
}

export default function Alphabet(props: Props) {
  const { letters, update } = props
  return (
    <div style={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap' }}>
      {letters.map((props) => (
        <Letter {...props} update={update} />
      ))}
    </div>
  )
}
