import type { userType, userPasswordType } from './userType'

import {
  REGISTER_NEW_USER_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
  RESET_USER_PASSWORD_MUTATION,
} from '../api/user/user.mutation'

type errorType = {
  message: string,
  name: string,
  statusCode: number,
}

export type graphQLErrorsTypes = {
  graphQLErrors: Array<errorType>,
}

type registerNewUserVariablesType = { input: userType }

type registerNewUserOptionsType = {
  variables: registerNewUserVariablesType,
}

export type registerNewUserMutationType = MutationFunctionOptions<
  REGISTER_NEW_USER_MUTATION,
  registerNewUserOptionsType
>

type resetUserPasswordVariablesType = { input: userPasswordType }

type resetUserPasswordOptionsType = {
  variables: resetUserPasswordVariablesType,
}

export type resetUserPasswordMutationType = MutationFunctionOptions<
  RESET_USER_PASSWORD_MUTATION,
  resetUserPasswordOptionsType
>

type requestPasswordResetEmailType = { email: string }
type requestPasswordResetVariablesType = {
  input: requestPasswordResetEmailType,
}
type requestPasswordResetOptionsType = {
  variables: requestPasswordResetVariablesType,
}
export type requestPasswordResetMutationType = MutationFunctionOptions<
  REQUEST_PASSWORD_RESET_MUTATION,
  requestPasswordResetOptionsType
>
