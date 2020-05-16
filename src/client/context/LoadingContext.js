import * as React from 'react'
// $FlowFixMe - Applying a type to createContext<T> breaks react from compiling the app.
export const LoadingContext = React.createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
})

type Props = {
  children?: React.Node,
}

export default function LoadingProvider(props: Props) {
  const { children } = props
  const [loading, setLoading] = React.useState(false)

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setTimeout(() => setLoading(false), 300),
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
