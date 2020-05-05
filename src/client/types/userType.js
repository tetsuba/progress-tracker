export type userType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export type userPasswordType = {
  password: string,
  token?: string,
}

export type UserTokenType = {
  token: string | void,
}

export type LoginUserType = {
  loginUser?: UserTokenType,
}

export type UserDataType = {
  data?: LoginUserType,
}
