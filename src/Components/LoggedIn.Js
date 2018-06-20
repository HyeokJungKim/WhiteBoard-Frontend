import React, { Component } from 'react'
import {Segment, Button} from 'semantic-ui-react'

class LoggedIn extends Component{

  handleClick = () => {
    this.props.history.push('/home')
  }

  render(){
    return(
        <Segment padded="very" textAlign='center'>
          <Button onClick={this.handleClick} basic color="blue" size='huge'>You're already logged in!</Button>
        </Segment>
    )
  }
}

export default LoggedIn
