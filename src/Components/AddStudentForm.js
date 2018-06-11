import React, { Component } from 'react'
import {Modal} from 'semantic-ui-react'

class AddStudentForm extends Component{
  state={
    firstName: "",
    lastName: "",

  }
  render(){
    return(
      <Modal size={"large"} open={this.props.open}>
        <Modal.Header>Add New Student</Modal.Header>
        <Modal.Content>

        </Modal.Content>
      </Modal>
    )
  }
}

export default AddStudentForm
