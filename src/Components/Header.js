import React, { Component } from 'react';
import {Menu, Button} from 'semantic-ui-react'

class Header extends Component{
  registration = () => {
    this.props.history.push('/register')
  }

  login = () => {
    this.props.history.push('/login')
  }

  render(){
    console.log(this.props);
    return(
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary onClick={this.registration}> Register </Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary onClick={this.login}> Login </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default Header
