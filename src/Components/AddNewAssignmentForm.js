import React, { Component } from 'react'
import {Modal, Button, Header, Form} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'

import {AddNewAssignment} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddNewAssignmentForm extends Component{
  state={
    description: "",
    open:false,
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
      this.setState({open:false})
      this.props.AddNewAssignment(resp)
    })
  }

  showForm = () => {
    this.setState({open: true})
  }

  render(){
    return(
      <Modal size={"large"} open={this.state.open} trigger={<Button size="small" floated="right" onClick={this.showForm}>Add New Assignment</Button>} closeIcon>
        <Header icon="pencil" content="Add New Assignment"></Header>
        <Modal.Content>
          <Form>
            <Form.TextArea value={this.state.description} onChange={this.handleChange} label="Description" name="description" placeholder="Write a description for this homework assignment..."/>
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
    AddNewAssignment: (classroomJson) =>{
      return dispatch(AddNewAssignment(classroomJson))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssignmentForm)
