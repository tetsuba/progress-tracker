import React from 'react'

type Props = {
  letter: string,
}

export default function HistogramXAxisValue(props: Props) {
  const { letter } = props
  const styles = {
    width: '3%',
    textAlign: 'center',
  }

  return <div style={styles}>{letter}</div>
}
