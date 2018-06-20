import React, { Component } from 'react'
import {Modal, Header, Segment, Icon, Form, Dropdown, Divider} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'

import {updateClassroom, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class ListOfExistingStudents extends Component{
  state={
    open: true,
    students:[],
    studentsToAdd: [],
    isDisabled: false,
    error: "",
  }

  componentDidMount = () => {
    const currentStudentArr = this.props.displayedClassroom.students.map(student => student.id)
    const studentArr = this.props.students.map(student =>{
      return {id: student.id, key: student.id, value:`${student.firstName} ${student.lastName}`, text: `${student.firstName} ${student.lastName}`}
    })
    const difference = studentArr.filter(student => currentStudentArr.indexOf(student.id) < 0)
    if(difference.length > 0) {
      this.setState({students: difference})
    } else {
      this.setState({isDisabled: true, error: "You cannot add anybody else!"})
    }
  }

  onClick = () => {
    this.setState({open: true})
  }

  close = () => {
    this.setState({open:false})
    this.props.resetStudents()
  }


  handleSelect = (event) => {
    if (!this.state.isDisabled) {
      let studentsArr = [...this.state.studentsToAdd, parseInt(event.currentTarget.id)]
      this.setState({studentsToAdd: studentsArr})
    }
  }


  submitForm = () => {
    const studentsArr = {studentsArr: this.state.studentsToAdd}
    ClassAdapter.addStudent(this.props.displayedClassroom.id, studentsArr)
    .then(resp =>{
      this.props.updateClassroom(resp)
      this.props.changeDisplayedClassroom(resp)
      this.close()
    })
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <Modal size={"large"} open={this.state.open}>
        <Segment basic>
          <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
          <Header icon="book" content="Select A Student to Add"></Header>
        </Segment>
        <Segment basic>
          {error}
        </Segment>
        <Modal.Content>
          <Form>
            <Dropdown label="Students" onChange={this.handleSelect} fluid multiple search selection options={this.state.students}>
            </Dropdown>
            <Divider hidden></Divider>
            <Form.Button disabled={this.state.isDisabled} onClick={this.submitForm}>Add Student</Form.Button>
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
    updateClassroom: (classroomObj) =>{
      return dispatch(updateClassroom(classroomObj))
    },
    changeDisplayedClassroom: (classroomObject) =>{
      return dispatch(changeDisplayedClassroom(classroomObject))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfExistingStudents)
