import React, { Component } from 'react'

import Header from '../Components/Header'
import RegistrationForm from '../Components/RegistrationForm'

import {Container} from 'semantic-ui-react'

class RegistrationContainer extends Component{
  render(){
    return(
      <div>
      <Header {...this.props}></Header>
        <Container>
          <RegistrationForm/>
        </Container>
      </div>
    )
  }
}

export default RegistrationContainer
