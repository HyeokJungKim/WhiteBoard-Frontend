import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Button, Icon} from 'semantic-ui-react'
import OneClassInfo from './OneClassInfo'

class StudentGradeBook extends Component{
  state={
    display:"none"
  }

  validDisplay = () => {
    const {displayedClassroom} = this.props
    return displayedClassroom && displayedClassroom.assignments
  }

  renderAssignments = () => {
    const {displayedClassroom} = this.props
    if(this.validDisplay() && displayedClassroom.assignments.length > 0){
      const assignmentIds = displayedClassroom.assignments.map(assignment => {
        return assignment.id
      })

      return displayedClassroom.assignments.map(assignment => {
        let filteredGrades = assignment.grades.filter(grade => {
          return grade.student_id === parseInt(localStorage.getItem("id")) && assignmentIds.includes(grade.assignment_id)
        })
        let studentGrades = filteredGrades.map(grade => {
          return <Table.Cell textAlign="center" key={grade.id} id={grade.id}>{grade.grade}</Table.Cell>
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
          <Table.Cell textAlign="center">You don't have any assignments for this class!</Table.Cell>
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

  handleClick = (event) => {
    this.setState({display: event.currentTarget.name})
  }

  render(){
    let assignments = this.renderAssignments()
    let className = this.renderClassName()
    return(
      <Container>
        {className}
        <Table fixed definition compact>
          <Table.Header>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="center" >Grades</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
              {assignments}
          </Table.Body>
        </Table>
        <Button.Group floated="right">
          <Button onClick={this.handleClick} name="bar" icon> <Icon name='chart bar' /> </Button>
          <Button onClick={this.handleClick} name="line" icon> <Icon name='line graph' /> </Button>
          <Button onClick={this.handleClick} name="none" icon> <Icon name='hide' /> </Button>
        </Button.Group>
        <OneClassInfo display={this.state.display} validDisplay={this.validDisplay}/>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(StudentGradeBook)
