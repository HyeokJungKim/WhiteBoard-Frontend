import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Button, Icon} from 'semantic-ui-react'

class GradeBook extends Component{
  state={
    addStudent: false,
  }

  renderAssignmentsForTeacher = () => {
    const {displayedClassroom} = this.props
    if(displayedClassroom.assignments){
      return displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    } else{
      return []
    }
  }

  renderStudentsForTeacher= () => {
    const {displayedClassroom} = this.props

    if(displayedClassroom.students && displayedClassroom.assignments){
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
            <Table.Cell>{student.firstName}</Table.Cell>
            {filteredGrades}
          </Table.Row>
        )
      })
    } else {
      return []
    }
  }

  renderAssignmentsForStudent = () => {
    if(!this.props.isTeacher){
      const {displayedClassroom} = this.props
      if(displayedClassroom.assignments && displayedClassroom.assignments.length > 0){
        const assignmentIds = displayedClassroom.assignments.map(assignment => {
          return assignment.id
        })

        return displayedClassroom.assignments.map(assignment => {
          let filteredGrades = assignment.grades.filter(grade => {
            return grade.student_id == localStorage.getItem("id") && assignmentIds.includes(grade.assignment_id)
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

      } else{
        return(
          <Table.Row>
            <Table.Cell>You don't have any assignments for this class!</Table.Cell>
          </Table.Row>
        )
      }
    }
  }

  render(){
    let assignmentsForTeacher = this.renderAssignmentsForTeacher()
    let studentsForTeacher = this.renderStudentsForTeacher()
    let assignmentsForStudent = this.renderAssignmentsForStudent()
    return(
      <Container>
        <h1>{this.props.displayedClassroom.name}</h1>
        <Table definition compact>
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
            {this.props.isTeacher ?
              <Table.Row>
                <Table.Cell>
                  <Button>
                    <Icon name="plus"></Icon>
                  </Button>
                </Table.Cell>
              </Table.Row>
            :
            null
            }
          </Table.Body>


        </Table>

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
