import React, { Component } from 'react'
import {Modal, Button, Header, Form} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'

import {updateClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddExistingStudentForm extends Component{
  state={
    firstName: "",
    lastName: "",

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleClick = (event) => {
  //   const classData = {description: this.state.description}
  //   ClassAdapter.createAssignment(this.props.displayedClassroom.id, classData)
  //   .then(resp =>{
  //     if(resp.error){
  //       this.setState({error: resp.error})
  //     } else {
  //       this.props.AddExistingAssignment(resp)
  //     }
  //   })
  // }

  render(){

    return(
      <Modal size={"large"} trigger={<Button size="small" floated="right">Add Existing Student</Button>} closeIcon>
        <Header icon="book" content="Add Existing Student"></Header>
        <Modal.Content>

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
    updateClassroom: (classroomObj) =>{
      return dispatch(updateClassroom(classroomObj))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExistingStudentForm)
