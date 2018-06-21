import React, { Component } from 'react'

import Header from '../Components/Header'
import LoginForm from '../Components/LoginForm'

import {Container} from 'semantic-ui-react'

class LoginContainer extends Component{
  render(){
    return(
      <div>
      <Header {...this.props}></Header>
        <Container>
          <LoginForm {...this.props}/>
        </Container>
      </div>
    )
  }
}

export default LoginContainer
