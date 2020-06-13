import React from 'react'

type Props = {
  data: any,
  index: number,
}

export default function HistogramYAxisValue(props: Props) {
  const { data, index } = props
  const styles = {
    alignItems: 'center',
    display: 'flex',
    height: `${100 / data.a.total}%`,
    justifyContent: 'flex-end',
    borderTop: 'solid 1px #000',
    fontSize: '14px',
    position: 'relative',
  }
  const startValue = index === 0 ? '1' : ''
  const endValue = index === data.a.total - 1 ? String(data.a.total) : ''

  const valueStyles = {
    position: 'absolute',
    top: '-12px',
    right: '100%',
    paddingRight: '2px',
  }

  return (
    <div style={styles}>
      {startValue && <span style={valueStyles}>{startValue}</span>}
      {endValue && <span style={valueStyles}>{endValue}</span>}
    </div>
  )
}
