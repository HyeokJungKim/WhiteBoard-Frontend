import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Grid, Divider} from 'semantic-ui-react'

import AddNewAssignmentForm from './AddNewAssignmentForm'
import AddNewStudentForm from './AddNewStudentForm'
import AddExistingStudentForm from './AddExistingStudentForm'
import ListOfExistingStudents from './ListOfExistingStudents'
import EditGradeForm from './EditGradeForm'

class TeacherGradeBook extends Component{
  state={
    editGrade: false,
    gradeID: "",
    students: []
  }

  renderAssignments = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay() && displayedClassroom.assignments.length > 0){
      return displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell textAlign="center" key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    } else{
      return <Table.HeaderCell textAlign="center"> You don't have any assignments!</Table.HeaderCell>
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
          return <Table.Cell className="hover" textAlign="center" key={grade.id} id={grade.id} onClick={this.changeGrade}>{grade.grade}</Table.Cell>
        })
        return (
          <Table.Row key={student.id}>
            <Table.Cell >{`${student.firstName} ${student.lastName}`}</Table.Cell>
            {filteredGrades}
          </Table.Row>
        )
      })
    } else {
      return <Table.Row><Table.Cell>You don't have any students!</Table.Cell></Table.Row>
    }
  }

  changeGrade = (event) => {
    this.setState({editGrade: true, gradeID: event.target.id})
  }

  closeEdit = () => {
    this.setState({editGrade: false, gradeID: ""})
  }

  renderClassName = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay()){
      return <h1>{displayedClassroom.name}</h1>
    }
  }

  setStudents = (studentsArr) => {
    this.setState({students: studentsArr})
  }

  resetStudents = () => {
    this.setState({students: []})
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
              <AddExistingStudentForm setStudents={this.setStudents}/>
            </Grid.Column>

            <Grid.Column>
              <AddNewStudentForm/>
            </Grid.Column>

          </Grid.Row>
        </Grid>
        <Divider hidden/>

        <Container className="gradebook">
          <Table fixed definition compact collapsing >
            <Table.Header>
              <Table.HeaderCell />
                {assignments}
            </Table.Header>
            <Table.Body>
              {students}
            </Table.Body>
          </Table>
          <Divider hidden/>
        </Container>

          {this.state.editGrade ?
            <EditGradeForm gradeID={this.state.gradeID} editGrade={this.state.editGrade} closeEdit={this.closeEdit}/>
            :
            null
          }
          {this.state.students.length > 0 ?
            <ListOfExistingStudents resetStudents={this.resetStudents} students={this.state.students}/>
            :
            null
            //FIXME: STUDENTS CANNOT BE 0
          }
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
