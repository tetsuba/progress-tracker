import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/hooks'
import { TOKEN_KEY } from '../const/localStorage'

export const AuthenticatedContext = React.createContext({
  authenticated: false,
  toggle: () => {},
})

export default function AuthenticatedCxt({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [setLocalStorage] = useLocalStorage(TOKEN_KEY)

  return (
    <AuthenticatedContext.Provider
      value={{
        authenticated,
        toggle: function (auth) {
          !auth && setLocalStorage('')
          setAuthenticated(auth)
        },
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  )
}
