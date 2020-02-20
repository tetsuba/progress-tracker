import React, {Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from './routes/Routes';

// COMPONENTS
import { GlobalModal } from './components/Modal/GlobalModal';
import { Header } from './components/Header/Header';

const App = () => {
  return (
      <Fragment>
        <Router>
          <div>
            <Header />
            <Routes />
          </div>
        </Router>
        <GlobalModal/>
      </Fragment>
  );
};

export default App;
