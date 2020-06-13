import React from 'react'
import HistogramYAxisValue from './HistogramYAxisValue'

type Props = {
  data: any,
}

export default function HistogramYAxis(props: Props) {
  const { data } = props
  const YAxis = Array(data.a.total).fill(0)
  const styles = {
    width: '1%',
    paddingBottom: '42px',
  }

  return (
    <div className="HistogramYAxis" style={styles}>
      <div
        style={{
          position: 'absolute',
          transform: 'rotate(-90deg)',
          transformOrigin: '0 center',
          top: '60%',
          left: '0',
          color: '#666',
          fontSize: '14px',
        }}
      >
        Number of assessments
      </div>
      {YAxis.map((_, index) => (
        <HistogramYAxisValue key={`${index}-yAxis`} data={data} index={index} />
      )).reverse()}
    </div>
  )
}
