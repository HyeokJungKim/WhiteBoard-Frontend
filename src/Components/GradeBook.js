import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Divider} from 'semantic-ui-react'
import AddNewAssignmentForm from './AddNewAssignmentForm'
import AddNewStudentForm from './AddNewStudentForm'
import AddExistingStudentForm from './AddExistingStudentForm'
class GradeBook extends Component{

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

  renderAssignmentsForStudent = () => {
    const {displayedClassroom} = this.props
    if(!this.props.isTeacher && this.validDisplay() && displayedClassroom.assignments.length > 0){
      const assignmentIds = displayedClassroom.assignments.map(assignment => {
        return assignment.id
      })

      return displayedClassroom.assignments.map(assignment => {
        let filteredGrades = assignment.grades.filter(grade => {
          return grade.student_id === localStorage.getItem("id") && assignmentIds.includes(grade.assignment_id)
        })
        let studentGrades = filteredGrades.map(grade => {
          return <Table.Cell key={grade.id} id={grade.id}>{grade.grade}</Table.Cell>
        })
        return(
          <Table.Row key={assignment.id}>
            <Table.Cell>{assignment.description}</Table.Cell>
            {studentGrades}
          </Table.Row>
        )
      })

    } else if(!this.props.isTeacher){
      return(
        <Table.Row>
          <Table.Cell>You don't have any assignments for this class!</Table.Cell>
        </Table.Row>
      )
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
    let assignmentsForStudent = this.renderAssignmentsForStudent()
    let className = this.renderClassName()

    return(
      <Container>
        {className}
        <Table fixed definition compact>
          <Table.Header>
            <Table.HeaderCell />
            {this.props.isTeacher ?
              assignmentsForTeacher
              :
              <Table.HeaderCell>Grades</Table.HeaderCell>
            }
          </Table.Header>


          <Table.Body>
            {this.props.isTeacher ?
              studentsForTeacher
            :
              assignmentsForStudent
            }

          </Table.Body>
        </Table>
        {this.props.isTeacher ?
          <div>
            <AddNewAssignmentForm/>
            <Divider clearing hidden/>
            <AddExistingStudentForm/>
            <Divider clearing hidden/>
            <AddNewStudentForm/>
          </div>
        :
          null
        }

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


export default connect(mapStateToProps)(GradeBook)
