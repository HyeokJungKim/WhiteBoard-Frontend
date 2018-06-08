import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Button, Icon} from 'semantic-ui-react'

class GradeBook extends Component{
  state={
    addStudent: false
  }

  render(){
    const {displayedClassroom} = this.props
    let assignments = []
    if(displayedClassroom.assignments){
      assignments = displayedClassroom.assignments.map(assignment => {
         return <Table.HeaderCell key={assignment.id}>{assignment.description}</Table.HeaderCell>
       })
    }
    let students = []
    if(displayedClassroom.students){
      students = displayedClassroom.students.map(student => {
        let grades = student.grades.map(grade => {
          return <Table.Cell id={grade.id}>{grade.grade}</Table.Cell>
        })
        return (
          <Table.Row key={student.id}>
            <Table.Cell>{student.firstName}</Table.Cell>
            {grades}
          </Table.Row>
        )
      })
    }
    return(
      <Container>
        <h1>{this.props.displayedClassroom.name}</h1>
        <Table definition compact>
          <Table.Header>
            <Table.HeaderCell />
            {assignments}
          </Table.Header>

          <Table.Body>
            {students}
                {this.state.addStudent ?
                  <p>HIOS</p>
                  :
                  <Table.Row>
                    <Table.Cell>
                      <Button>
                        <Icon name="plus"></Icon>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                }

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


export default connect(mapStateToProps)(GradeBook)
