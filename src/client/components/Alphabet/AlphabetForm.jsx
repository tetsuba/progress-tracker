import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'react-bootstrap'

// CONTEXT
import { LoadingContext } from '../../context/LoadingContext'

// COMPONENTS
import Alphabet from './Alphabet'

// QUERIES
import { GET_ALPHABET_ASSESSMENT } from '../../api/assessment/alphabet/alphabet.query'

// MUTATIONS
import { SAVE_ALPHABET_ASSESSMENT_MUTATION } from '../../api/assessment/alphabet/alphabet.mutaion'

// DEFAULT STATE
import ALPHABET_DEFAULT_STATE from './Alphabet.defualtState'
import { formatDefaultState } from './alphabet-utils'

// TODO: add loading indicator
type Props = {
  id: string,
  toggleModal: () => void,
  data: any,
  type: string,
}

export default function AlphabetForm(props: Props) {
  const { toggleModal, id, data, type } = props
  const defaultState =
    formatDefaultState(data) ||
    (type === 'lowerCase'
      ? ALPHABET_DEFAULT_STATE.map((state) => ({
          ...state,
          letter: state.letter.toLocaleLowerCase(),
        }))
      : ALPHABET_DEFAULT_STATE)

  const variables = {
    input: {
      studentId: id || '',
      typeOfAlphabetAssessment: type || '',
    },
  }

  const { showLoading, hideLoading } = React.useContext(LoadingContext)

  const [letters, setLetters] = useState(defaultState)
  const [saveAlphabetAssessment] = useMutation(
    SAVE_ALPHABET_ASSESSMENT_MUTATION,
    {
      refetchQueries: [{ query: GET_ALPHABET_ASSESSMENT, variables }],
    }
  )

  useEffect(() => {
    setLetters(defaultState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Alphabet letters={letters} update={setLetters} />
      <Button
        className="float-right"
        onClick={() => {
          const variables = {
            input: {
              studentId: id,
              date: String(Date.now()),
              alphabet: letters,
              typeOfAlphabetAssessment: type,
            },
          }
          showLoading()
          saveAlphabetAssessment({ variables })
            .then(() => {
              setLetters(defaultState)
              toggleModal()
              hideLoading()
            })
            .catch(() => {
              // TODO: An error message should be displayed to the user
              toggleModal()
              hideLoading()
            })
        }}
      >
        Save Progress
      </Button>
    </>
  )
}
