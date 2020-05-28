import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'react-bootstrap'

// CONTEXT
import { LoadingContext } from '../../context/LoadingContext'

// COMPONENTS
import Alphabet from '../Alphabet/Alphabet'

// QUERIES
import { GET_STUDENT_COURSE_ABC } from '../../api/course/courseABC/courseABC.query'

// MUTATIONS
import { SAVE_COURSE_PROGRESS_MUTATION } from '../../api/course/courseABC/courseABC.mutation'

// DEFAULT STATE
import ALPHABET_DEFAULT_STATE from '../Alphabet/Alphabet.defualtState'

// TODO: add loading indicator
type Props = {
  id: string,
}

export default function AlphabetForm(props: Props) {
  const { id } = props
  const { showLoading, hideLoading } = React.useContext(LoadingContext)
  const variables = {
    input: {
      id: id || '',
    },
  }

  const [letters, setLetters] = useState(ALPHABET_DEFAULT_STATE)
  const [saveCourseProgress] = useMutation(SAVE_COURSE_PROGRESS_MUTATION, {
    refetchQueries: [{ query: GET_STUDENT_COURSE_ABC, variables }],
  })

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
          showLoading()
          saveCourseProgress({ variables })
            .then(() => {
              setLetters(ALPHABET_DEFAULT_STATE)
              hideLoading()
            })
            .catch(() => hideLoading())
        }}
      >
        Save Progress
      </Button>
    </>
  )
}
