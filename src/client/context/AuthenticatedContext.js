import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/hooks'
import { TOKEN_KEY } from '../const/localStorage'
import { useQuery } from '@apollo/react-hooks'
import { IS_USER_SESSION_EXPIRED } from '../api/user/user.query'
import Loading from '../components/Loading/Loading'

export const AuthenticatedContext = React.createContext({
  authenticated: false,
  toggle: () => {},
})

export default function AuthenticatedCxt({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [setLocalStorage, token] = useLocalStorage(TOKEN_KEY)
  const { loading, data } = useQuery(IS_USER_SESSION_EXPIRED)

  /* Set authentication to true:
   * - data exists
   * - authenticated is false
   * - token exists
   *  */
  if (data && !authenticated && token) {
    setAuthenticated(true)
  }

  if (loading) return <Loading />

  return (
    <AuthenticatedContext.Provider
      value={{
        authenticated,
        toggle: (token) => {
          if (token) {
            setLocalStorage(token)
            setAuthenticated(true)
            console.log('+++ Login')
          } else {
            setLocalStorage('')
            setAuthenticated(false)
            console.log('--- Logout')
          }
        },
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  )
}
