// TODO: update types
type Props = {
  getAlphabetAssessment: {
    history: [any],
  },
}

export function formatDefaultState(data: Props) {
  if (data.getAlphabetAssessment.history.length < 1) {
    return undefined
  }
  const eof = data.getAlphabetAssessment.history.length - 1
  const state = data.getAlphabetAssessment.history[eof].alphabet
  return state.map(({ letter, value }) => ({ letter, value }))
}
