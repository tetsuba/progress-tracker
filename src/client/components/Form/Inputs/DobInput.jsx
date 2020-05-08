import * as React from 'react'
import { Form, Col } from 'react-bootstrap'
import { getDates, getYears } from '../utils/inputs-utils'

// TYPES
import type { eventType } from '../../../types/eventType'

type inputTypes = {
  firstName: string,
  lastName: string,
  DOBDate: string,
  DOBMonth: string,
  DOBYear: number,
  teacherID: string,
}

type Props = {
  inputs: inputTypes,
  setInputs: (e: eventType) => void,
}

export default function DobInput(props: Props) {
  const { inputs, setInputs } = props
  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridDOB">
        <Form.Control
          as="select"
          size="lg"
          custom
          onChange={setInputs}
          value={inputs.DOBDate}
          name={'DOBDate'}
        >
          <option disabled>Date:</option>
          {getDates(inputs.DOBMonth).map((date) => (
            <option key={`dobdate-${date}`}>{date}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <h3 className="text-muted p-1">/</h3>
      <Form.Group as={Col} controlId="formGridDOB">
        <Form.Control
          as="select"
          size="lg"
          custom
          onChange={setInputs}
          value={inputs.DOBMonth}
          name={'DOBMonth'}
        >
          <option disabled>Month:</option>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </Form.Control>
      </Form.Group>
      <h3 className="text-muted p-1">/</h3>
      <Form.Group as={Col} controlId="formGridDOB">
        <Form.Control
          as="select"
          size="lg"
          custom
          onChange={setInputs}
          value={inputs.DOBYear}
          name={'DOBYear'}
        >
          <option disabled>Year:</option>
          {getYears(inputs.DOBYear).map((year) => (
            <option key={`dobyear-${year}`}>{year}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form.Row>
  )
}
