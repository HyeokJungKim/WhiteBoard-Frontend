import React, { Component } from 'react'
import {Menu, Button} from 'semantic-ui-react'

class Header extends Component{
  registration = () => {
    this.props.history.push('/register')
  }

  login = () => {
    this.props.history.push('/login')
  }

  logout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  render(){
    return(
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            {localStorage.getItem('name') ?
              <p>Logged in as: {`${localStorage.getItem('name')}`}</p>
              :
              <Button primary onClick={this.registration}> Register </Button>
            }


          </Menu.Item>
          <Menu.Item>
            {localStorage.getItem('name') ?
              <Button primary onClick={this.logout}> Logout </Button>
              :
              <Button primary onClick={this.login}> Login </Button>
            }

          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default Header
