import { formatDefaultState } from '../alphabet-utils'

describe('alphabet-utils', () => {
  describe('formatDefaultState', () => {
    it('should return undefined if history is an empty array', () => {
      const props = {
        getAlphabetAssessment: {
          history: [],
        },
      }
      expect(formatDefaultState(props)).toEqual(undefined)
    })

    it('should return a default state', () => {
      const alphabetMock = 'abcdefghijklnmopqrstuvwxyz'
        .split('')
        .map((letter) => ({
          letter: letter,
          value: 0,
        }))

      const props = {
        getAlphabetAssessment: {
          history: [{ alphabet: alphabetMock }],
        },
      }
      expect(formatDefaultState(props)).toEqual(alphabetMock)
    })
  })
})
