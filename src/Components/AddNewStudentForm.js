import React, { Component } from 'react'
import {Modal, Button, Header, Form} from 'semantic-ui-react'

import StudentAdapter from '../Adapters/StudentAdapter'

import {AddNewStudent, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddNewStudentForm extends Component{
  state={
    firstName: "",
    lastName: "",
    errors: [],
  }

  titleize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    const {lastName, firstName} = this.state
    const studentData = {firstName: this.titleize(firstName.trim()), lastName: this.titleize(lastName.trim()), class_id: this.props.displayedClassroom.id}
    StudentAdapter.register(studentData)
    .then(resp =>{
      if(resp.errors){
        this.setState({errors: resp.errors})
      } else {
        this.props.AddNewStudent(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })

  }

  render(){
    return(
      <Modal size={"large"} trigger={<Button size="small" floated="right">Add New Student</Button>} closeIcon>
        <Header icon="book" content="Add New Student"></Header>
        <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input name="firstName" value={this.state.firstName} onChange={this.handleChange} label="First Name" placeholder="First Name"/>
            <Form.Input name="lastName" value={this.state.lastName} onChange={this.handleChange} label="Last Name" placeholder="Last Name"/>
          </Form.Group>
          <Form.Button onClick={this.handleClick}>Submit</Form.Button>
        </Form>
        </Modal.Content>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    displayedClassroom: state.displayedClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddNewStudent: (classroomObject) =>{
      return dispatch(AddNewStudent(classroomObject))
    },
    changeDisplayedClassroom: (classroomObject) =>{
      return dispatch(changeDisplayedClassroom(classroomObject))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudentForm)
