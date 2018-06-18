import React, { Component } from 'react'

import {Form, Button, Divider, Radio, Select} from 'semantic-ui-react'
import TeacherRegistrationForm from'./TeacherRegistrationForm'

import {initializeTeacher, initializeStudent} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class RegistrationForm extends Component{
  state={
    forWhom: "teacher",
    showRadio: true,
    schoolName: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>{
      if(this.state.forWhom === "teacher" && this.state.firstName && this.state.lastName && this.state.username && this.state.password && this.state.passwordConfirmation){
        this.setState({isDisabled:false})
      } else if(this.state.forWhom === "school" && this.state.password && this.state.passwordConfirmation){
        this.setState({isDisabled:false})
      } else{
        this.setState({isDisabled:true})
      }
    })
  }

  handleRadio = (event, {value}) => {
    this.setState({forWhom: value})
  }

  showRadio = () => {
    this.setState({showRadio: false})
  }

  render(){
    return(
        <div>
          {this.state.showRadio ?
            <div>
                <Radio label="I am registering as a teacher" value="teacher" name="forWhom" checked={this.state.forWhom === "teacher"} onChange={this.handleRadio}/>
                <Divider hidden/>
                <Radio label="I am registering for a school" value="school" name="forWhom" checked={this.state.forWhom === "school"} onChange={this.handleRadio}/>
                <Divider hidden/>
            </div>
            :
            null
          }

          {this.state.forWhom === "teacher" ?
            <TeacherRegistrationForm {...this.props} showRadio={this.showRadio}/>
              :
            <Form>
              IGNORE
              <Form.Input onChange={this.handleChange} value={this.state.schoolName} label="School Name" name="schoolName" placeholder="School Name"/>
              <Form.Input onChange={this.handleChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
              <Form.Input onChange={this.handleChange} value={this.state.passwordConfirmation} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
            </Form>

          }
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

export default connect(null, mapDispatchToProps)(RegistrationForm)
