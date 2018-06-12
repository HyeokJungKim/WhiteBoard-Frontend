import React, { Component } from 'react'

import {Form, Button, Divider, Radio} from 'semantic-ui-react'
import TeacherAdapter from '../Adapters/TeacherAdapter'
import StudentAdapter from '../Adapters/StudentAdapter'

import {initializeTeacher, initializeStudent} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class LoginForm extends Component{

  state={
    username:"",
    password:"",
    isDisabled:true,
    error:"",
    forWhom: "teacher",
  }

  setLocalStorage = (json) => {
    localStorage.setItem("token", json.token)
    localStorage.setItem("id", json.id)
    localStorage.setItem("name", json.name)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>{
      if(this.state.username && this.state.password){
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
    const {username, password} = this.state
    const userInfo = {username, password}
    if(this.state.forWhom === "teacher"){
      TeacherAdapter.login(userInfo)
      .then(json => {
        if(json.error){
          this.setState({error:json.error})
        } else {
          this.setLocalStorage(json)
          TeacherAdapter.getClasses()
          .then(classes => {
            console.log(classes);
            this.props.initializeTeacher(classes)
            this.props.history.push('/home')
          })
        }
      })
    }else{
      StudentAdapter.login(userInfo)
      .then(json => {
        if(json.error){
          this.setState({error:json.error})
        } else {
          this.setLocalStorage(json)
          StudentAdapter.getClasses()
          .then(classes =>{
            console.log(classes);
            this.props.initializeStudent(classes)
            this.props.history.push('/home')
          })
        }
      })
    }
  }

  render(){
    return(
      <div>
        <h4>{this.state.error}</h4>
        <Form>
          <Form.Input onChange={this.handleChange} value={this.state.username} label="Username" name="username" placeholder="Username" />
          <Form.Input onChange={this.handleChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
          <Form.Field>
            <Radio label="I am a teacher" value="teacher" name="forWhom" checked={this.state.forWhom === "teacher"} onChange={this.handleRadio}/>
          </Form.Field>
          <Form.Field>
            <Radio label="I am a student" value="student" name="forWhom" checked={this.state.forWhom === "student"} onChange={this.handleRadio}/>
          </Form.Field>
        </Form>
        <Divider hidden/>
        <Button onClick={this.handleClick} disabled={this.state.isDisabled} content="Login"/>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeTeacher: (classroomsJSON) =>{
      return dispatch(initializeTeacher(classroomsJSON))
    },
    initializeStudent: (classroomsJSON) =>{
      return dispatch(initializeStudent(classroomsJSON))
    },
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
