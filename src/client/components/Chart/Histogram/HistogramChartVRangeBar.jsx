import React from 'react'

type Props = {
  correct?: boolean,
  wrong?: boolean,
  height: number,
}

export default function HistogramChartVRangeBar(props: Props) {
  const { correct, height } = props
  const style = {
    width: '100%',
    height: `${height}%`,
    backgroundColor: correct ? '#309c3f' : 'red',
    boxSizing: 'border-box',
    borderTop: 'solid 1px #CCC',
  }

  return <div style={style} />
}
