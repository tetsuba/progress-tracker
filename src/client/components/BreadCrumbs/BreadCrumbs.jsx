import React from 'react'
import { Breadcrumb, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import crumbs from './crumbs'

type Props = {
  crumbKey: string,
  name?: string,
  id?: string,
}

export default function BreadCrumbs(props: Props) {
  const eof = crumbs[props.crumbKey].length - 1

  function addCrumb({ path, name, id, replace }, index) {
    if (id) path = path.replace('{id}', props.id)
    if (replace) name = props.name || ''
    return eof > index ? (
      <li key={`${name}-${index}`} className="breadcrumb-item">
        <Link to={path}>{name}</Link>
      </li>
    ) : (
      <Breadcrumb.Item key={`${name}-${index}`} active>
        {name}
      </Breadcrumb.Item>
    )
  }

  function Crumbs() {
    return crumbs[props.crumbKey].map(addCrumb)
  }

  return (
    <Row>
      <Breadcrumb>
        <Crumbs />
      </Breadcrumb>
    </Row>
  )
}
