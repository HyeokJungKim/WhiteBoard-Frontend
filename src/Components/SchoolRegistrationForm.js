import React, { Component } from 'react'
import {Form, Button, Divider} from 'semantic-ui-react'
import SchoolAdapter from '../Adapters/SchoolAdapter'
import {initializeTeacher} from '../Redux/ActionCreators'

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
        console.log(resp);
        //FIXME NEED TO FIGURE OUT WHERE TO SEND
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
      </Form>
      <Divider hidden/>
      <Button onClick={this.handleClick} disabled={this.state.isDisabled} content="Register"/>
    </div>
   )
 }
}



export default SchoolRegistrationForm
