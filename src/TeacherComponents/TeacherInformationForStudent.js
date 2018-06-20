import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Icon, Button} from 'semantic-ui-react'
import OneStudentInfo from './OneStudentInfo'

class TeacherInformationForStudent extends Component{
  state={
    studentToDisplay: null,
    display: "bar",
    showPieChart: false,
  }

  renderClassName = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay()){
      return (
          <h1>{displayedClassroom.name}</h1>
      )
    }
  }

  renderStudents = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay() && displayedClassroom.students.length > 0 ){
      const assignmentIds = displayedClassroom.assignments.map(assignment => {
        return assignment.id
      })

      displayedClassroom.students.sort((a,b) => {
        if(a.firstName < b.firstName) return -1
        if(a.firstName > b.firstName) return 1
        return 0
      })

      return displayedClassroom.students.map(student => {
          let average = 0
          let counter = 0
          student.grades.forEach(grade => {
            if(assignmentIds.includes(grade.assignment_id)){
              average += grade.grade
              counter += 1
            }
          })
          if(counter > 0){
            average = Math.round(average/counter * 100)/100
          } else {
            average = 0
          }

          return(
          <Table.Row key={student.id}>
            <Table.Cell className="hover" id={student.id} onClick={this.onClick}>{`${student.firstName} ${student.lastName}`}</Table.Cell>
            {student.isAccount ?
              <Table.Cell>{`${student.username}`}</Table.Cell>
            :
              <Table.Cell error><Icon name='attention' />{`${student.username}`}</Table.Cell>
            }
            <Table.Cell>{average}</Table.Cell>
          </Table.Row>
          )
        })
    } else {
      return []
    }
  }

  onClick = (event) => {
    this.setState({studentToDisplay: event.target.id})
  }

  handleClick = (event) => {
    this.setState({display: event.currentTarget.name})
  }

  close = () => {
    this.setState({studentToDisplay: null})
  }

  render(){
    const className = this.renderClassName()
    const students = this.renderStudents()
    return(
      <Container fluid>
        {className}
        <Table color={'blue'} fixed compact singleLine >
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Average</Table.HeaderCell>
          </Table.Row>
          {students}
        </Table>
        {this.state.studentToDisplay ?
          <div>
            <OneStudentInfo display={this.state.display} close={this.close} studentToDisplay={this.state.studentToDisplay}/>
              <Button.Group floated="left">
                <Button onClick={this.handleClick} name="bar" icon> <Icon name='chart bar' /> </Button>
                <Button onClick={this.handleClick} name="line" icon> <Icon name='line graph' /> </Button>
              </Button.Group>
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
    displayedClassroom: state.displayedClassroom,
  }
}

export default connect(mapStateToProps)(TeacherInformationForStudent)
