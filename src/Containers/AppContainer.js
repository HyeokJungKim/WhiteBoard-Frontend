import React, { Component } from 'react'
import {Segment, Grid, Image} from 'semantic-ui-react'
import Header from '../Components/Header'
import LoginRegistrationForm from '../Components/LoginRegistrationForm'
import LoggedIn from '../Components/LoggedIn.js'

class AppContainer extends Component{
  render(){
    return(
      <div>
        <Header {...this.props}/>

        <Segment basic>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Image src="https://thecrayoninitiative.org/wp-content/uploads/2017/12/school.png" alt='school' centered></Image>
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
        </Segment>
      </div>
    )
  }
}

export default AppContainer
