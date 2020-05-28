import React from 'react'
import { useLocation } from 'react-router-dom'

export default function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>
        No match for <span className="text-danger">{location.pathname}</span>
      </h3>
    </div>
  )
}
