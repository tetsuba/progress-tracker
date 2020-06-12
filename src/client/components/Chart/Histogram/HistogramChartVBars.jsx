import React from 'react'
import HistogramChartVRangeBar from './HistogramChartVRangeBar'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type Props = {
  data: {
    history: [number],
    correct: number,
    wrong: number,
    total: number,
  },
}

export default function HistogramChartVBars(props: Props) {
  const { data } = props

  const style = {
    width: '100%',
    height: '100%',
    backgroundColor: '#CCC',
    padding: '1px',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  }

  const height = 100 / data.total
  const placement = 'top'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '3%',
      }}
    >
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={
          <Tooltip id={`tooltip-${placement}`}>
            <strong>
              {data.correct} Correct {data.wrong} Wrong
            </strong>
            .
          </Tooltip>
        }
      >
        <div style={style}>
          {data.history
            .map((value, index) => {
              switch (value) {
                case 1:
                  return (
                    <HistogramChartVRangeBar
                      key={`correct-${index}`}
                      height={height}
                      correct
                    />
                  )
                case 2:
                  return (
                    <HistogramChartVRangeBar
                      key={`wrong-${index}`}
                      height={height}
                      wrong
                    />
                  )
                default:
                  return null
              }
            })
            .reverse()}
        </div>
      </OverlayTrigger>
    </div>
  )
}
