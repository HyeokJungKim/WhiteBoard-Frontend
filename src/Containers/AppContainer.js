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
              <Grid.Column width={9}>
              </Grid.Column>

              <Grid.Column width={7}>
                <LoginRegistrationForm {...this.props}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default AppContainer
