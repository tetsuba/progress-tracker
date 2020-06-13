import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'

export default function HistogramKey() {
  const styles = {
    textAlign: 'center',
    width: '100%',
  }
  return (
    <div className="HistogramKey" style={styles}>
      <span style={{ color: '#309c3f', marginRight: '20px' }}>
        <FontAwesomeIcon icon={faSquare} /> Correct
      </span>
      <span style={{ color: 'red' }}>
        <FontAwesomeIcon icon={faSquare} /> wrong
      </span>
    </div>
  )
}
