import React, { Component } from 'react'
import {Form, Divider} from 'semantic-ui-react'
import SchoolAdapter from '../Adapters/SchoolAdapter'

class SchoolRegistrationForm extends Component{
  state = {
    password: "",
    passwordConfirmation: "",
    schoolName: "",
    isDisabled: true,
    errors: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>{
      if(this.state.password && this.state.schoolName && this.state.passwordConfirmation){
        this.setState({isDisabled: false})
      }else{
        this.setState({isDisabled:true})
      }
    })
  }

  handleClick = () => {
    const {schoolName, password, passwordConfirmation} = this.state
    if(password === passwordConfirmation){
      const schoolInfo = {name: schoolName, password}
      SchoolAdapter.createSchool(schoolInfo)
      .then(resp =>{
        if(resp.errors){
          this.setState({errors: resp.errors, isDisabled: false})
        }else{
          this.setState({errors: ["School successfully created!"]})
        }
      })
    } else {
      this.setState({errors:["Password confirmation does not match password."]})
    }
  }

 render(){
   const errors = this.state.errors.map(error => <h4>{error}</h4>)
   return(
     <div>
       <Form>
         {errors}
         <Form.Input onChange={this.handleChange} value={this.state.schoolName} label="School Name" name="schoolName" placeholder="School Name"/>
         <Form.Input onChange={this.handleChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
         <Form.Input onChange={this.handleChange} value={this.state.passwordConfirmation} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
         <Form.Button onClick={this.handleClick} disabled={this.state.isDisabled}>Register School</Form.Button>
      </Form>
      <Divider hidden/>
    </div>
   )
 }
}



export default SchoolRegistrationForm
