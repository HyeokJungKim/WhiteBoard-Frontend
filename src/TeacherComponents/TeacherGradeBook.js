import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Grid} from 'semantic-ui-react'
import AddNewAssignmentForm from './AddNewAssignmentForm'
import AddNewStudentForm from './AddNewStudentForm'
import AddExistingStudentForm from './AddExistingStudentForm'

class TeacherGradeBook extends Component{

  renderAssignments = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay() && displayedClassroom.assignments.length > 0){
      return displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    } else{
      return [<Table.HeaderCell> You don't have any assignments!</Table.HeaderCell>]
    }
  }

  renderStudents= () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay() && displayedClassroom.students.length > 0 ){
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
    if(this.props.validDisplay()){
      return <h1>{displayedClassroom.name}</h1>
    }
  }

  render(){
    const assignments = this.renderAssignments()
    const students = this.renderStudents()
    const className = this.renderClassName()

    return(
      <Container>
        {className}
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <AddNewAssignmentForm/>
            </Grid.Column>
            <Grid.Column>
              <AddExistingStudentForm/>
            </Grid.Column>
            <Grid.Column>
              <AddNewStudentForm/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table fixed definition compact>
          <Table.Header>
            <Table.HeaderCell />
              {assignments}
          </Table.Header>
          <Table.Body>
            {students}
          </Table.Body>
        </Table>
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
