import React, { Component } from 'react'

import {Divider, Radio} from 'semantic-ui-react'
import TeacherRegistrationForm from'./TeacherRegistrationForm'
import SchoolRegistrationForm from './SchoolRegistrationForm'
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
            <SchoolRegistrationForm/>
          }
        </div>

    )
  }
}


export default RegistrationForm
