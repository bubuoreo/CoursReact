import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './HomePage';
import BuyPage from './BuyPage';
import SellPage from './SellPage';
import RegistrationPage from './RegistrationPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/buy" component={BuyPage} />
        <Route path="/sell" component={SellPage} />
        <Route path="/" exact component={LoginPage} />
        {/* Redirect to login page if no match found */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;