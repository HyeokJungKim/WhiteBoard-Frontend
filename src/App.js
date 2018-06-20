import React, { Component } from 'react';
import './App.css';

import AppContainer from './Containers/AppContainer'
import LoginContainer from './Containers/LoginContainer'
import RegistrationContainer from './Containers/RegistrationContainer'

import HomeContainer from './Containers/HomeContainer'
import CreateClassForm from './TeacherComponents/CreateClassForm'

import ResetInformation from './StudentComponents/ResetInformation'
import {Switch, Route, Redirect} from 'react-router-dom'

class App extends Component {
  state={
    firstTime: true,
    addClassForm: true
  }

  close = () => {
    this.setState({firstTime: false, addClassForm: false})
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact render={(props) => <AppContainer {...props}/>}>
        </Route>

        <Route path='/register' render={(props) => <RegistrationContainer {...props}/>}>

        </Route>


        <Route path='/login' render={(props) => <LoginContainer {...props}/>}></Route>

        {localStorage.getItem('token') ?
          <Route path='/home' render={(props) => <HomeContainer {...props}/> }></Route>
            :
          <Redirect to='/'/> }

        {localStorage.getItem('token') ?
          <Route path='/create_first_class' render={(props) => <CreateClassForm {...props} firstTime={this.state.firstTime} closeFirstTime={this.close} addClassForm={this.state.addClassForm}/>}/>
          :
          <Redirect to='/'/>
        }

        {localStorage.getItem('token') ?
          <Route path='/reset_information' render={(props)=> <ResetInformation {...props}/>}/>
            :
          <Redirect to='/'/>
        }

      </Switch>
    )
  }
}

export default App;
