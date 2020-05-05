type errorType = {
  message: string,
  name: string,
  statusCode: number,
}

export type graphQLErrorsTypes = {
  graphQLErrors: Array<errorType>,
}
