import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Divider} from 'semantic-ui-react'
import AddNewAssignmentForm from './AddNewAssignmentForm'
import AddNewStudentForm from './AddNewStudentForm'
import AddExistingStudentForm from './AddExistingStudentForm'

class TeacherGradeBook extends Component{

  validDisplay = () => {
    const {displayedClassroom} = this.props
    return displayedClassroom && displayedClassroom.assignments && displayedClassroom.students
  }

  renderAssignmentsForTeacher = () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay() && displayedClassroom.assignments.length > 0){
      return displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    } else{
      return [<Table.HeaderCell> You don't have any assignments!</Table.HeaderCell>]
    }
  }

  renderStudentsForTeacher= () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay() && displayedClassroom.students.length > 0 ){
      const assignmentIds = displayedClassroom.assignments.map(assignment => {
        return assignment.id
      })

      return displayedClassroom.students.map(student => {
        let grades = student.grades.filter(grade =>{
          return assignmentIds.includes(grade.assignment_id)
        })
        let filteredGrades = grades.map(grade => {
          return <Table.Cell key={grade.id} id={grade.id} onClick={this.changeGrade}>{grade.grade}</Table.Cell>
        })
        return (
          <Table.Row key={student.id}>
            <Table.Cell>{`${student.firstName} ${student.lastName}`}</Table.Cell>
            {filteredGrades}
          </Table.Row>
        )
      })
    } else {
      return [<Table.Row><Table.Cell>You don't have any students!</Table.Cell></Table.Row>]
    }
  }

  changeGrade = (event) => {
    console.log(event.target.id);
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
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(TeacherGradeBook)
