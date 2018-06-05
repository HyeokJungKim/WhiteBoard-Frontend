import React, { Component } from 'react';
import {Container,Grid} from 'semantic-ui-react'
import Header from '../Components/Header'

class AppContainer extends Component{
  render(){
    return(
      <Container>
        <Header {...this.props}/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
            </Grid.Column>

            <Grid.Column width={6}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default AppContainer
