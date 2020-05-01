import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'

function AbcUnit() {
  return (
    <Container>
      <Row className="mt-5">
        <div className="list-group">
          <a
            href={() => console.log('')}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Reading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Completed
              </label>
            </div>
          </a>
          <a
            href={() => console.log('')}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Writing</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
              />
              <label className="custom-control-label" htmlFor="customSwitch2">
                Completed
              </label>
            </div>
          </a>
          <a
            href={() => console.log('')}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Spelling</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch3"
              />
              <label className="custom-control-label" htmlFor="customSwitch3">
                Completed
              </label>
            </div>
          </a>
        </div>
      </Row>
      <Button className="float-right" variant="secondary">
        Start
      </Button>
      <Button className="float-right ml-2" variant="primary" type="submit">
        Completed
      </Button>
    </Container>
  )
}

export default AbcUnit
