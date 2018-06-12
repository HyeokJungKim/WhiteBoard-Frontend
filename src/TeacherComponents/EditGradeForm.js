import React, { Component } from 'react'
import {Modal, Button, Header, Form, Icon} from 'semantic-ui-react'

import GradeAdapter from '../Adapters/GradeAdapter'

import {AddNewAssignment, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class EditGradeForm extends Component{
  state={
    grade: "",
    error: "",
  }

  componentDidMount = () => {
    GradeAdapter.getGrade(this.props.gradeID)
    .then(resp =>{
      this.setState({grade: resp.grade})
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    console.log(event);
    const gradeData = {grade: this.state.grade}
    
  }

  render(){
    return(
      <Modal size={"small"} open={this.props.editGrade}>
        <Header icon="pencil">Add New Assignment<Icon onClick={this.props.closeEdit} name="pencil"/></Header>
        <Modal.Content>
          <Form>
            <Form.Input type="number" value={this.state.grade} name="grade" onChange={this.handleChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGradeForm)
