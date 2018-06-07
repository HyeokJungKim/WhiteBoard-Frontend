import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table} from 'semantic-ui-react'

class GradeBook extends Component{

  render(){
    const {displayedClassroomInfo} = this.props
    let assignments = []

    if(displayedClassroomInfo[0]){
      assignments = displayedClassroomInfo[0].assignments.map(assignment => {
        return <Table.HeaderCell>{assignment.description}</Table.HeaderCell>
      })
    }

    const students = displayedClassroomInfo.map(student => {
      let grades = student.grades.map(grade =>{
        return <Table.Cell id={grade.id}>{grade.grade}</Table.Cell>
      })

      return (
        <Table.Row key={student.id}>
          <Table.Cell id={student.id}>{student.firstName}</Table.Cell>
          {grades}
        </Table.Row>)
    })

    return(
      <Container>
        <h1>{this.props.displayedClassroom.name}</h1>
        <Table definition>
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
    displayedClassroomInfo: state.displayedClassroomInfo
  }
}


export default connect(mapStateToProps)(GradeBook)
