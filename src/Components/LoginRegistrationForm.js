import React, { Component } from 'react';
import {Menu, Segment} from 'semantic-ui-react'
import RegistrationForm from './RegistrationForm'

class LoginRegistrationForm extends Component{
  state={
    activeItem: 'Login'
  }

  handleClick = (event, {name}) => {
    this.setState({activeItem: name})
  }

  render(){
    const{ activeItem } = this.state
    return(
      <div>
        <Menu attached='top' tabular>
          <Menu.Item name='Login' onClick={this.handleClick} active={activeItem ==='Login'}></Menu.Item>
          <Menu.Item name='Register' onClick={this.handleClick} active={activeItem ==='Register'}></Menu.Item>
        </Menu>
        <Segment attached="bottom">
          {activeItem === 'Login' ? <p>Login</p> : <RegistrationForm/>}
        </Segment>
    </div>
    )
  }
}

export default LoginRegistrationForm
