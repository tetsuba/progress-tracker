const numOfDays = {
  '01': 31,
  '02': 29,
  '03': 31,
  '04': 30,
  '05': 31,
  '06': 30,
  '07': 31,
  '08': 31,
  '09': 30,
  '10': 31,
  '11': 30,
  '12': 31,
}

export function getDates(month: string): Array<string> {
  return Array(numOfDays[month])
    .fill('')
    .map((_, index) => {
      const num = index + 1
      return num > 9 ? String(num) : `0${num}`
    })
}

export function getYears(year: number): Array<number> {
  return Array(16)
    .fill('')
    .map((_, index) => {
      return Number(year) - index
    })
}
