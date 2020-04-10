import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from './routes/Routes';

// COMPONENTS
import { GlobalModal } from './components/Modal/GlobalModal';
import { Header } from './components/Header/Header';

const App = () => {
  return (
      <>
        <Router>
          <div>
            <Header />
            <Routes />
          </div>
        </Router>
        <GlobalModal/>
      </>
  );
};

export default App;
