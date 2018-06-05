import React, { Component } from 'react';
import {Form, Button, Divider} from 'semantic-ui-react'

class RegistrationForm extends Component{
  state={
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    passwordConfirmation:"",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div>
        <Form>
          <Form.Input onChange={this.handleChange} label='First Name' name="firstName" placeholder="First Name" />
          <Form.Input onChange={this.handleChange} label='Last Name' name="lastName" placeholder="Last Name" />
          <Form.Input onChange={this.handleChange} label="Username" name="username" placeholder="Username" />
          <Form.Input onChange={this.handleChange} type="password" label="Password" name="password" placeholder="Password" />
          <Form.Input onChange={this.handleChange} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
        </Form>
        <Divider hidden/>
        <Button content="Register"/>
      </div>
    )
  }
}

export default RegistrationForm
