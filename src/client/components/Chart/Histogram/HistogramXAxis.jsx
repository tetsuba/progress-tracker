import React from 'react'
import HistogramXAxisValue from './HistogramXAxisValue'

type Props = {
  data: any,
}

export default function HistogramXAxis(props: Props) {
  const { data } = props
  const values = Object.keys(data)
  const styles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '0 0 8px 8px',
  }
  return (
    <div className="HistogramXAxis" style={styles}>
      {values.map((value) => (
        <HistogramXAxisValue key={`${value}-xAxis`} letter={value} />
      ))}
    </div>
  )
}
