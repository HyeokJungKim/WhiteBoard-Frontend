import React, { Component } from 'react'
import {Modal, Button, Header, Form} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'

import {AddNewAssignment} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddNewStudentForm extends Component{
  state={
    description: "",
    error: "",
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
  //       this.props.AddNewAssignment(resp)
  //     }
  //   })
  // }

  render(){

    return(
      <Modal size={"large"} trigger={<Button size="small" floated="right">Add New Student</Button>} closeIcon>
        <Header icon="pencil" content="Add New Student"></Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudentForm)
