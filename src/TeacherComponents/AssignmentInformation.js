import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Table, Grid, Divider} from 'semantic-ui-react'
import ClassAdapter from '../Adapters/ClassAdapter'

class AssignmentInformation extends Component{
  state={
    assignments:[]
  }

  componentDidMount = () => {
    const {displayedClassroom} = this.props
    this.changeState(displayedClassroom)
  }

  componentWillReceiveProps = (nextProps) => {
    const {displayedClassroom} = nextProps
    this.changeState(displayedClassroom)
  }

  changeState = (displayedClassroom) => {
    if(this.props.validDisplay()){
      ClassAdapter.getGrades(displayedClassroom.id)
      .then(resp => {
        this.setState({assignments: resp.assignments})
      })
    }
  }


  renderAssignments = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay() && this.state.assignments.length > 0){
      return this.state.assignments.map(assignment =>{
        let range1 = 0
        let range2 = 0
        let range3 = 0

        assignment.grades.forEach(grade => {
          if(grade.grade < 65){
            range1 += 1
          } else if (grade.grade >=65 && grade.grade <= 85){
            range2 += 1
          } else if (grade.grade > 85){
            range3 += 1
          }
        })
        return(
          <Table.Row key={assignment.id}>
            <Table.Cell>{assignment.description}</Table.Cell>
            <Table.Cell textAlign="center">{range1}</Table.Cell>
            <Table.Cell textAlign="center">{range2}</Table.Cell>
            <Table.Cell textAlign="center">{range3}</Table.Cell>
          </Table.Row>
        )
      })
    } else{
      return <Table.Row><Table.Cell>You don't have any assignments!</Table.Cell></Table.Row>
    }
  }

  renderClassName = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay()){
      return <h1>{displayedClassroom.name}</h1>
    }
  }

  render(){
    const name = this.renderClassName()
    const assignments = this.renderAssignments()
    return(
      <Container className="gradebook">
        {name}
        <Table fixed definition compact >
          <Table.Header>
            <Table.HeaderCell/>
            <Table.HeaderCell textAlign="center">Less than 65</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">65-85</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Greater than 85</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {assignments}
          </Table.Body>
        </Table>
        <Divider hidden/>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}

export default connect(mapStateToProps)(AssignmentInformation)
