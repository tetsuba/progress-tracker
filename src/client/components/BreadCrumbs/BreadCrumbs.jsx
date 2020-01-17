import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const BreadCrumbs = ({crumbs}) => {

    function addCrumb({ path, name }) {
        return path
            ? (
                <li key={name} className="breadcrumb-item">
                    <Link to={path}>{name}</Link>
                </li>
            )
            : (
                <Breadcrumb.Item key={name} active>
                    { name }
                </Breadcrumb.Item>
            )
    }

    function Crumbs() {
        return crumbs.map(addCrumb)
    }

    return (
        <Breadcrumb>
            <Crumbs/>
        </Breadcrumb>
    )
}
