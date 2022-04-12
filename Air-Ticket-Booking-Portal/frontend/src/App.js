import React from 'react';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
// import Shop from './Shop';
// import Employee from './Employee';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
      <Nav />
      <Switch>
    
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/flights" exact component={Home} />
      {/* <Route path="/user/:uid/book" component={Booking} /> */}
      {/* <Route path="/user/cancel/:bid" component={Cancel} /> */}
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
