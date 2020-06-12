import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'react-bootstrap'

// CONTEXT
import { LoadingContext } from '../../context/LoadingContext'

// COMPONENTS
import Alphabet from './Alphabet'

// QUERIES
import { GET_STUDENT_COURSE_ABC } from '../../api/course/courseABC/courseABC.query'

// MUTATIONS
import { SAVE_COURSE_PROGRESS_MUTATION } from '../../api/course/courseABC/courseABC.mutation'

// DEFAULT STATE
import ALPHABET_DEFAULT_STATE from './Alphabet.defualtState'
import { formatDefaultState } from './alphabet-utils'

// TODO: add loading indicator
type Props = {
  id: string,
  toggleModal: () => void,
  data: any,
}

export default function AlphabetForm(props: Props) {
  const { toggleModal, id, data } = props
  const defaultState = formatDefaultState(data) || ALPHABET_DEFAULT_STATE

  const variables = {
    input: {
      id: id || '',
    },
  }

  const { showLoading, hideLoading } = React.useContext(LoadingContext)

  const [letters, setLetters] = useState(defaultState)
  const [saveCourseProgress] = useMutation(SAVE_COURSE_PROGRESS_MUTATION, {
    refetchQueries: [{ query: GET_STUDENT_COURSE_ABC, variables }],
  })

  useEffect(() => {
    setLetters(defaultState)
  }, [data, defaultState])

  return (
    <>
      <Alphabet letters={letters} update={setLetters} />
      <Button
        className="float-right"
        onClick={() => {
          const variables = {
            input: {
              id: id,
              date: String(Date.now()),
              alphabet: letters,
            },
          }

          console.log('AlphabetForm Submit: ', variables)

          showLoading()
          saveCourseProgress({ variables })
            .then(() => {
              setLetters(defaultState)
              toggleModal()
              hideLoading()
            })
            .catch(() => {
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
