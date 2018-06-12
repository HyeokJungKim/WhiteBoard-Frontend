import React, { Component } from 'react'
import {Modal, Button, Header, Form} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'

import {AddNewAssignment, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddNewAssignmentForm extends Component{
  state={
    description: "",
    error: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    const classData = {description: this.state.description}
    ClassAdapter.createAssignment(this.props.displayedClassroom.id, classData)
    .then(resp =>{
      if(resp.error){
        this.setState({error: resp.error})
      } else {
        this.props.AddNewAssignment(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <Modal size={"large"} trigger={<Button size="small" floated="right">Add New Assignment</Button>} closeIcon>
        <Header icon="pencil" content="Add New Assignment"></Header>
        {error}
        <Modal.Content>
          <Form>
            <Form.TextArea value={this.state.description} onChange={this.handleChange} label="New Assignment" name="description" placeholder="Write a description for this homework assignment..."/>
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
    AddNewAssignment: (classroomObject) =>{
      return dispatch(AddNewAssignment(classroomObject))
    },
    changeDisplayedClassroom: (classroomObject) =>{
      return dispatch(changeDisplayedClassroom(classroomObject))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssignmentForm)
