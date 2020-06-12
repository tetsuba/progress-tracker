import React from 'react'
import HistogramChartVBars from './HistogramChartVBars'
import type { HistogramDataType } from './Histogram'

type Props = {
  data: HistogramDataType,
}

export default function HistogramChart(props: Props) {
  const { data } = props
  const styles = {
    width: '100%',
    height: '400px',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    borderBottom: 'solid 1px #666',
    borderLeft: 'solid 1px #666',
    padding: '0 0 8px 8px',
  }

  const bars: Array<[string, any]> = Object.entries(data)

  return (
    <div style={styles}>
      {bars.map(([key, value]) => (
        <HistogramChartVBars key={`${key}-bar`} data={value} />
      ))}
    </div>
  )
}
