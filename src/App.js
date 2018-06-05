import React, { Component } from 'react';
import './App.css';
import AppContainer from './Containers/AppContainer'
import {Switch, Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path='/' exact
          render={(props) => <AppContainer {...props}/>}>
        </Route>
        <Route path='/register'>
          <p>Hello</p>
        </Route>
      </Switch>

    )
  }
}

export default App;
