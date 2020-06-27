import type { AlphabetAssessmentType } from '../../types/api/assessment/alphabetQueryTypes'
import type { HistogramDataType } from '../../components/Chart/Histogram/Histogram'

export function formatDataForHistogram(
  data: AlphabetAssessmentType
): HistogramDataType {
  const { history } = data.getAlphabetAssessment

  console.log('formatDataForHistogram: ', history)

  return history.reduce((acc, cur) => {
    cur.alphabet.forEach(({ letter, value }) => {
      const correctValue = acc[letter] ? acc[letter].correct : 0
      const wrongValue = acc[letter] ? acc[letter].wrong : 0

      acc[letter] = {
        history: acc[letter] ? [...acc[letter].history, value] : [value],
        correct: value === 1 ? correctValue + 1 : correctValue,
        wrong: value === 2 ? wrongValue + 1 : wrongValue,
        total: history.length,
      }
    })

    return acc
  }, {})
}
