import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'

// COMPONENTS
import GlobalModal from './components/Modal/GlobalModal'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes />
        </div>
      </Router>
      <GlobalModal />
      <Loading />
    </>
  )
}

export default App
