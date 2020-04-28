import React from 'react'

export default function Box({ children, max, className }) {
  const style = {
    maxWidth: max,
    width: '100%',
    padding: '20px 20px',
    backgroundColor: '#f8f9fa',
    margin: '0 auto',
    borderRadius: '8px',
    border: 'solid 1px #ccc',
  }
  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}
