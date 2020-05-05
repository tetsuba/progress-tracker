import * as React from 'react'

type Props = {
  children: React.Node,
  eventHandler: () => void,
}

export default function TextLink(props: Props) {
  const { eventHandler, children } = props
  const styles = { color: '#007bff', cursor: 'pointer' }
  return (
    <span style={styles} id="TextLink" onClick={eventHandler}>
      {children}
    </span>
  )
}
