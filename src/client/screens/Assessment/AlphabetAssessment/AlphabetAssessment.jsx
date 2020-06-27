import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'

// COMPONENTS
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import Alphabet from '../../../components/Alphabet/Alphabet'
import { CRUMBS_KEY } from '../../../components/BreadCrumbs/crumbs'
import Histogram from '../../../components/Chart/Histogram/Histogram'
import AlphabetModal from '../../../components/Modal/AlphabetModal'

// CONTEXT
import { ModalContext } from '../../../context/ModalContext'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// QUERIES
import { GET_ALPHABET_ASSESSMENT } from '../../../api/assessment/alphabet/alphabet.query'

// UTILS
import { formatDataForHistogram } from '../assessment-utils'

export default function AlphabetAssessment() {
  const { id, type } = useParams()

  const variables = {
    input: {
      studentId: id || '',
      typeOfAlphabetAssessment: type || '',
    },
  }
  const options = {
    variables,
  }
  // $FlowFixMe - Investigate how to fix this flow issue
  const { loading, data } = useQuery(GET_ALPHABET_ASSESSMENT, options)
  const { toggleModal, addTemplate } = useContext(ModalContext)

  useEffect(() => {
    addTemplate(AlphabetModal, { id: id, data: data, type: type })
  }, [addTemplate, data, id, type])

  if (loading) return <div>LOADING</div>
  const showHistogram = data.getAlphabetAssessment.history.length > 1

  return (
    <Container>
      <Row className="mt-5">
        <BreadCrumbs
          crumbKey={CRUMBS_KEY.ALPHABET}
          name={data.getAlphabetAssessment.studentName}
          id={id}
        />
      </Row>
      <Row className="mt-5">
        <h1>Alphabet assessment ({type})</h1>
      </Row>

      <Button
        className="float-right"
        variant="primary"
        onClick={() => toggleModal()}
      >
        <FontAwesomeIcon icon={faPlus} /> Add assessment
      </Button>
      <Row className="mt-5">
        <Col>
          {showHistogram && <Histogram data={formatDataForHistogram(data)} />}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>History:</h3>
          <ListGroup variant="flush">
            {data.getAlphabetAssessment.history
              .map(({ date, alphabet }) => (
                <ListGroup.Item key={date}>
                  <div>{new Date(Number(date)).toDateString()}</div>
                  <Alphabet letters={alphabet} />
                </ListGroup.Item>
              ))
              .reverse()}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
