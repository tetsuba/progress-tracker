import React from 'react'
import { Fade, Spinner } from 'react-bootstrap'

export default function Loading({ fade }) {
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
  return (
    <Fade in={fade}>
      <div style={style}>
        <Spinner animation="border" role="status" variant="light">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </Fade>
  )
}
