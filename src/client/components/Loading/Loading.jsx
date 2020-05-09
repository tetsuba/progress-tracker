import React, { useContext } from 'react'
import { Fade, Spinner } from 'react-bootstrap'

// CONTEXT
// $FlowFixMe - Investigate how to fix context flow issue
import { LoadingContext } from '../../context/LoadingContext'

type Props = {
  fade?: number,
}

export default function Loading(props: Props) {
  const { loading } = useContext(LoadingContext)

  const style = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1000',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (loading) {
    return (
      <Fade in={loading}>
        <div style={style}>
          <Spinner animation="border" role="status" variant="light">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Fade>
    )
  }
  return null
}
