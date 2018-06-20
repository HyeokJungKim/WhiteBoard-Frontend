import React, { Component } from 'react'
import {Container,Grid, Image} from 'semantic-ui-react'
import Header from '../Components/Header'
import LoginRegistrationForm from '../Components/LoginRegistrationForm'
import LoggedIn from '../Components/LoggedIn.js'

class AppContainer extends Component{
  render(){
    return(
      <div>
        <Header {...this.props}/>

        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Image src="http://worldartsme.com/images/black-and-white-school-clipart-1.jpg" fluid centered></Image>
              </Grid.Column>

              <Grid.Column width={7}>
                {localStorage.getItem('token') ?
                  <LoggedIn {...this.props}/>
                  :
                  <LoginRegistrationForm {...this.props}/>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default AppContainer
