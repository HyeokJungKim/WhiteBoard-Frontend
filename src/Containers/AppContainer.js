import React, { Component } from 'react';
import {Container,Grid} from 'semantic-ui-react'
import Header from '../Components/Header'
import LoginRegistrationForm from '../Components/LoginRegistrationForm'


class AppContainer extends Component{
  render(){
    return(
      <div>
        <Header {...this.props}/>

        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
              </Grid.Column>

              <Grid.Column width={6}>
                <LoginRegistrationForm/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default AppContainer
