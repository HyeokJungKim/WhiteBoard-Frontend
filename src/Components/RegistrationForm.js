import React, { Component } from 'react'

import {Form, Button, Divider, Radio} from 'semantic-ui-react'
import TeacherAdapter from '../Adapters/TeacherAdapter'

import {initializeTeacher} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class RegistrationForm extends Component{
  state={
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    passwordConfirmation:"",
    isDisabled:true,
    errors:[],
    forWhom: "teacher",
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

  handleRadio = (event, {value}) => {
    this.setState({forWhom: value})
  }

  handleClick = (event) => {
    const {firstName, lastName, username, password, passwordConfirmation} = this.state
    if(password === passwordConfirmation){
      const userInfo = {firstName, lastName, username, password}
      TeacherAdapter.register(userInfo)
        .then(json => {
          if(json.errors){
            this.setState({errors: json.errors})
          } else {
            localStorage.setItem("token", json.token)
            localStorage.setItem("id", json.id)
            localStorage.setItem("name", json.name)
            localStorage.setItem("forWhom", this.state.forWhom)
            this.props.initializeTeacher(json, this.state.forWhom)
            this.props.history.push('/home')
          }
        })
    } else{
      this.setState({errors:["Password confirmation does not match password."]})
    }
  }

  render(){
    const errors = this.state.errors.map(error => <h4>{error}</h4>)
    return(
      <div>
        {errors}
        <Form>
          <Form.Input onChange={this.handleChange} value={this.state.firstName} label='First Name' name="firstName" placeholder="First Name" />
          <Form.Input onChange={this.handleChange} value={this.state.lastName} label='Last Name' name="lastName" placeholder="Last Name" />
          <Form.Input onChange={this.handleChange} value={this.state.username} label="Username" name="username" placeholder="Username" />
          <Form.Input onChange={this.handleChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
          <Form.Input onChange={this.handleChange} value={this.state.passwordConfirmation} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
          <Form.Field>
            <Radio label="I am a teacher" value="teacher" name="forWhom" checked={this.state.forWhom === "teacher"} onChange={this.handleRadio}/>
          </Form.Field>
          <Form.Field>
            <Radio label="I am a student" value="student" name="forWhom" checked={this.state.forWhom === "student"} onChange={this.handleRadio}/>
          </Form.Field>
        </Form>
        <Divider hidden/>
        <Button onClick={this.handleClick} disabled={this.state.isDisabled} content="Register"/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeTeacher: (personObj, forWhom) =>{
      return dispatch(initializeTeacher(personObj, forWhom))
    }
  }
}

export default connect(null, mapDispatchToProps)(RegistrationForm)
