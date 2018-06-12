import React, { Component } from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'

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

  render(){
    const { activeIndex } = this.state
    const classNamesForGrades = this.props.classrooms.map(classroom => <List.Item key={classroom.id} ><List.Content onClick={this.changeClassDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)

    const classNamesForStudents = this.props.classrooms.map(classroom => <List.Item key={classroom.id} ><List.Content onClick={this.changeStudentInfoDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)
    return (
      <div>
        <Accordion attached="bottom" fluid styled>

          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Grades
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <List>
              {classNamesForGrades}
            </List>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Student Information
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            {classNamesForStudents}
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Schedule
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            {/* FILL */}
          </Accordion.Content>
        </Accordion>
      </div>
    )
  }
}

export default TeacherSidebar
