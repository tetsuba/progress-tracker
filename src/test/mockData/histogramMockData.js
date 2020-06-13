export function getMockData() {
  return 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .reduce((acc, cur) => {
      acc[cur] = { correct: 1, history: [1,2], total: 2, wrong: 1 }
      return acc
    }, {})
}
