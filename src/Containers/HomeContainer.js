import React, { Component } from 'react'
import {Container,Grid} from 'semantic-ui-react'

import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

class HomeContainer extends Component{
  render(){
    return(
      <div>
        <Header {...this.props}></Header>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Sidebar></Sidebar>
              </Grid.Column>

              <Grid.Column width={12}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default HomeContainer
