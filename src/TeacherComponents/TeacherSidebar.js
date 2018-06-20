import React, { Component } from 'react'
import { Accordion, Icon, List, Button, Segment } from 'semantic-ui-react'

class TeacherSidebar extends Component{
  state = {
    activeIndex: -1,
  }

  titleize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  handleAccordian = (event, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  changeClassDisplay = (event) =>{
    this.props.changeClassDisplay(event.target.id)
  }

  changeStudentInfoDisplay = (event) =>{
    this.props.changeStudentInfoDisplay(event.target.id)
  }

  changeAssignmentDisplay = (event) => {
    this.props.changeAssignmentDisplay(event.target.id)
  }

  render(){
    const { activeIndex } = this.state
    const classNamesForGrades = this.props.classrooms.map(classroom => <List.Item className="hover" key={classroom.id} ><List.Content onClick={this.changeClassDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)

    const classNamesForStudents = this.props.classrooms.map(classroom => <List.Item className="hover" key={classroom.id} ><List.Content onClick={this.changeStudentInfoDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)

    const classNamesForAssignments = this.props.classrooms.map(classroom => <List.Item className="hover" key={classroom.id} ><List.Content onClick={this.changeAssignmentDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)

    return (
      <div>
        <Accordion attached="bottom" fluid styled>

          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Grades
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Segment basic>
              <List className="list">
                {classNamesForGrades}
                <List.Item><Button onClick={this.props.renderForm} content="Add New Class"/></List.Item>
              </List>
            </Segment>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Students
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Segment basic>
              <List className="list">
                {classNamesForStudents}
              </List>
            </Segment>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Assignments
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Segment basic>
              <List className="list">
                {classNamesForAssignments}
              </List>
            </Segment>
          </Accordion.Content>
        </Accordion>
      </div>
    )
  }
}

export default TeacherSidebar
