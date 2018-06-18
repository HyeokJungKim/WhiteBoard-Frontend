import React, { Component } from 'react'
import {Modal, Button, Header, Form, Segment, Icon} from 'semantic-ui-react'

import StudentAdapter from '../Adapters/StudentAdapter'

import {updateClassroom, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class AddNewStudentForm extends Component{
  state={
    open: false,
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
        this.close()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })
  }

  onClick = () => {
    this.setState({open: true})
  }

  close = () => {
    this.setState({open: false})
  }

  render(){
    const errors = this.state.errors.map(error => <h4>{error}</h4>)
    return(
      <div>
        <Button onClick={this.onClick} size="small" floated="right">Add New Student</Button>
      {this.state.open ?
        <Modal size={"large"} open={this.state.open}>
          <Segment basic>
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
            <Header floated="left" icon="book" content="Add New Student"></Header>
          </Segment>
          {errors}
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
      :
        null
      }
      </div>
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
    updateClassroom: (classroomObject) =>{
      return dispatch(updateClassroom(classroomObject))
    },
    changeDisplayedClassroom: (classroomObject) =>{
      return dispatch(changeDisplayedClassroom(classroomObject))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudentForm)
