import React from 'react'
import HistogramYAxis from './HistogramYAxis'
import HistogramXAxis from './HistogramXAxis'
import HistogramChart from './HistogramChart'
import HistogramKey from './HistogramKey'

export type HistogramDataType = {
  [string]: {
    history: [number],
    correct: number,
    wrong: number,
    total: number,
  },
}

type Props = {
  data: HistogramDataType,
}

export default function Histogram(props: Props) {
  const { data } = props

  const styles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }

  return (
    <div className="Histogram" style={styles}>
      <HistogramYAxis data={data} />
      <div style={{ width: '99%' }}>
        <HistogramChart data={data} />
        <HistogramXAxis data={data} />
      </div>
      <HistogramKey />
    </div>
  )
}
