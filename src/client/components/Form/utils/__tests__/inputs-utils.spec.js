import { getDates, getYears } from '../inputs-utils'

const dates = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
]

describe('inputs-utils', () => {
  describe('getDates', () => {
    it('should return an array from 1 to 31 if month is Jan', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('01')).toEqual(expected)
    })
    it('should return an array from 1 to 29 if month is Feb', () => {
      const expected = [...dates].splice(0, 29)
      expect(getDates('02')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is Mar', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('03')).toEqual(expected)
    })
    it('should return an array from 1 to 30 if month is Apr', () => {
      const expected = [...dates].splice(0, 30)
      expect(getDates('04')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is May', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('05')).toEqual(expected)
    })
    it('should return an array from 1 to 30 if month is Jun', () => {
      const expected = [...dates].splice(0, 30)
      expect(getDates('06')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is Jul', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('07')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is Aug', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('08')).toEqual(expected)
    })
    it('should return an array from 1 to 30 if month is Sep', () => {
      const expected = [...dates].splice(0, 30)
      expect(getDates('09')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is Oct', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('10')).toEqual(expected)
    })
    it('should return an array from 1 to 30 if month is Nov', () => {
      const expected = [...dates].splice(0, 30)
      expect(getDates('11')).toEqual(expected)
    })
    it('should return an array from 1 to 31 if month is Dec', () => {
      const expected = [...dates].splice(0, 31)
      expect(getDates('12')).toEqual(expected)
    })
  })

  describe('getYears', () => {
    it('should return a list of years', () => {
      expect(getYears(2020)).toHaveLength(16)
    })
  })
})
