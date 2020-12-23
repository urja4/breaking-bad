import React from 'react';
import './css/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/Home-page';
import CharacterPage from './components/Character-page';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/' component = {HomePage} />
          <Route path = '/character/:id' component = {CharacterPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
