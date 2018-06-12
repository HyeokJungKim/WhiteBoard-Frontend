import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Divider} from 'semantic-ui-react'
import AddNewAssignmentForm from './AddNewAssignmentForm'
import AddNewStudentForm from './AddNewStudentForm'
import AddExistingStudentForm from './AddExistingStudentForm'

class TeacherGradebook extends Component{

  validDisplay = () => {
    const {displayedClassroom} = this.props
    return displayedClassroom && displayedClassroom.assignments
  }

  renderAssignmentsForTeacher = () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay()){
      return displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    } else{
      return []
    }
  }

  renderStudentsForTeacher= () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay() && displayedClassroom.students ){
      const assignmentIds = displayedClassroom.assignments.map(assignment => {
        return assignment.id
      })

      return displayedClassroom.students.map(student => {
        let grades = student.grades.filter(grade =>{
          return assignmentIds.includes(grade.assignment_id)
        })
        let filteredGrades = grades.map(grade => {
          return <Table.Cell key={grade.id} id={grade.id}>{grade.grade}</Table.Cell>
        })
        return (
          <Table.Row key={student.id}>
            <Table.Cell>{`${student.firstName} ${student.lastName}`}</Table.Cell>
            {filteredGrades}
          </Table.Row>
        )
      })
    } else {
      return []
    }
  }

  renderClassName = () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay()){
      return <h1>{displayedClassroom.name}</h1>
    }
  }

  render(){
    let assignmentsForTeacher = this.renderAssignmentsForTeacher()
    let studentsForTeacher = this.renderStudentsForTeacher()
    let className = this.renderClassName()

    return(
      <Container>
        {className}
        Teacher Gradebook
        <Table fixed definition compact>
          <Table.Header>
            <Table.HeaderCell />
              {assignmentsForTeacher}
          </Table.Header>
          <Table.Body>
            {studentsForTeacher}
          </Table.Body>
        </Table>
        <div>
          <AddNewAssignmentForm/>
          <Divider clearing hidden/>
          <AddExistingStudentForm/>
          <Divider clearing hidden/>
          <AddNewStudentForm/>
        </div>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isTeacher: state.isTeacher,
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(TeacherGradebook)
