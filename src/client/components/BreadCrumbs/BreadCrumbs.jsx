import React from 'react'
import { Breadcrumb, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type CrumbType = {
  path: string,
  name: string,
}

type Props = {
  crumbs: Array<CrumbType>,
}

export default function BreadCrumbs(props: Props) {
  const { crumbs } = props
  function addCrumb({ path, name }) {
    return path ? (
      <li key={name} className="breadcrumb-item">
        <Link to={path}>{name}</Link>
      </li>
    ) : (
      <Breadcrumb.Item key={name} active>
        {name}
      </Breadcrumb.Item>
    )
  }

  function Crumbs() {
    return crumbs.map(addCrumb)
  }

  return (
    <Row>
      <Breadcrumb>
        <Crumbs />
      </Breadcrumb>
    </Row>
  )
}
