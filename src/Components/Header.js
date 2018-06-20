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
    this.props.history.push('/')
    localStorage.clear()
  }

  render(){
    return(
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            {localStorage.getItem('token') ?
              <p>Logged in as: {`${localStorage.getItem('name')}`}</p>
              :
              <Button basic color="blue" onClick={this.registration}> Register </Button>
            }


          </Menu.Item>
          <Menu.Item>
            {localStorage.getItem('token') ?
              <Button basic color="blue" onClick={this.logout}> Logout </Button>
              :
              <Button basic color="blue" onClick={this.login}> Login </Button>
            }

          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default Header
