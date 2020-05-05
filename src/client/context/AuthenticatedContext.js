import * as React from 'react'
import { useLocalStorage } from '../hooks/hooks'
import { TOKEN_KEY } from '../const/localStorage'
import { useLazyQuery } from '@apollo/react-hooks'
import { IS_USER_SESSION_EXPIRED } from '../api/user/user.query'
import Loading from '../components/Loading/Loading'

export const AuthenticatedContext = React.createContext({
  authenticated: false,
  toggle: (token = '') => {},
})

type Props = {
  children?: React.Node,
}

export default function AuthenticatedCxt(props: Props) {
  const { children } = props
  const [authenticated, setAuthenticated] = React.useState(false)
  const [setLocalStorage, token] = useLocalStorage(TOKEN_KEY)
  const [isUserSessionExpired, { loading, data, error }] = useLazyQuery(
    IS_USER_SESSION_EXPIRED
  )

  React.useEffect(() => {
    if (token) isUserSessionExpired()
  }, [isUserSessionExpired, token])

  /* Set authentication to true:
   * - data exists
   * - authenticated is false
   * - token exists
   *  */
  if (data && !authenticated && token) {
    setAuthenticated(true)
  } else {
    if ((loading || data === undefined) && !authenticated && token && !error)
      return <Loading />
  }

  // User logs in with correct credentials redirects to home page
  // User clicks on page refresh with valid token and stays on the current page
  // User clicks on page refresh with expired token and is redirected to login page

  return (
    <AuthenticatedContext.Provider
      value={{
        authenticated,
        toggle: (token: string) => {
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
