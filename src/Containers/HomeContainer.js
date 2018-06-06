import React, { Component } from 'react';
import {Container,Grid} from 'semantic-ui-react'


import Header from '../Components/Header'


class HomeContainer extends Component{
  render(){
    return(
      <div>
        <Header {...this.props}></Header>
        <Container>
        </Container>
      </div>
    )
  }
}

export default HomeContainer
