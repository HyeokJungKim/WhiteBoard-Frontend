import React, { Component } from 'react';

import {Form, Button, Divider} from 'semantic-ui-react'
import TeacherAdapter from '../Adapters/TeacherAdapter'

import initialize from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class RegistrationForm extends Component{
  state={
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    passwordConfirmation:"",
    isDisabled:true,
    errors:""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>{
      if(this.state.firstName && this.state.lastName && this.state.username && this.state.password && this.state.passwordConfirmation){
        this.setState({isDisabled:false})
      } else (
        this.setState({isDisabled:true})
      )
    })
  }

  handleClick = (event) => {
    const {firstName, lastName, username, password, passwordConfirmation} = this.state
    if(password === passwordConfirmation){
      const teacherInfo = {firstName, lastName, username, password}
      TeacherAdapter.register(teacherInfo)
        .then(json => {
          console.log(json);
          if(json.errors){
            console.log("ERRORS HAVE BEEN MADE");
          } else {
            this.props.initialize(json)
            console.log(json);
          }
        })
    } else{
      this.setState({errors:"Password confirmation does not match password."})
    }
    // TeacherAdapter.register()
  }

  render(){
    return(
      <div>
        <h4>{this.state.errors}</h4>
        <Form>
          <Form.Input onChange={this.handleChange} value={this.state.firstName} label='First Name' name="firstName" placeholder="First Name" />
          <Form.Input onChange={this.handleChange} value={this.state.lastName} label='Last Name' name="lastName" placeholder="Last Name" />
          <Form.Input onChange={this.handleChange} value={this.state.username} label="Username" name="username" placeholder="Username" />
          <Form.Input onChange={this.handleChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
          <Form.Input onChange={this.handleChange} value={this.state.passwordConfirmation} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
        </Form>
        <Divider hidden/>
        <Button onClick={this.handleClick} disabled={this.state.isDisabled} content="Register"/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (personObj) =>{
      return dispatch(initialize(personObj))
    }
  }
}

export default connect(null, mapDispatchToProps)(RegistrationForm)
