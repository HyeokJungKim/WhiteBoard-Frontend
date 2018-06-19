import React, { Component } from 'react'
import {Modal, Header, Form, Segment, Icon} from 'semantic-ui-react'
import ClassAdapter from '../Adapters/ClassAdapter'
import {updateClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

//FIXME NEED TO ACCOUNT FOR ACTIVESTORAGE???

class EditAssignmentForm extends Component{
  state={
    assignmentName: "",
    error: ""
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleClick = () => {

  }

  handleDelete = () => {

  }

  close = () => {

  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <Modal size={"large"} open={}>
        <Segment basic>
          <Header floated="right"><Icon onClick={this.props.resetStudents} name="close"/></Header>
          <Header floated="left" icon="clipboard" content="Edit Assignment"></Header>
        </Segment>
        {error}
        <Modal.Content>
          <Form>
            <Form.Input value={this.state.assignmentName} onChange={this.onChange} label="Assignment Name" name="assignmentName" placeholder="Assignment Name"/>
            <Form.Button onClick={this.handleClick}>Submit</Form.Button>
            <Form.Button onClick={this.handleDelete}>Delete</Form.Button>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassroom: (classroomObject) =>{
      return dispatch(updateClassroom(classroomObject))
    },
  }
}

export default connect(null, mapDispatchToProps)(EditAssignmentForm)
