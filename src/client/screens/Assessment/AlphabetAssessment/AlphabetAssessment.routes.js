import React from 'react'
import AlphabetAssessment from './AlphabetAssessment'
import ProtectedRoute from '../../../routes/ProtectedRoute'

export default () => (
  <>
    <ProtectedRoute
      strict
      path="/student/:id/assessment/alphabet-:type"
      component={AlphabetAssessment}
    />
  </>
)
