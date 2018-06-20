import React, { Component } from 'react'
import { Accordion, Icon, List, Sticky } from 'semantic-ui-react'

class StudentSidebar extends Component{
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

  render(){
    const { activeIndex } = this.state
    const classNames = this.props.classrooms.map(classroom => <List.Item key={classroom.id} ><List.Content className="hover" onClick={this.changeClassDisplay} id={classroom.id}>{this.titleize(classroom.name)}</List.Content></List.Item>)
    return (
      <Sticky>
        <Accordion attached="bottom" fluid styled>

          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Grades
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <List>
              {classNames}
            </List>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Classes
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            HMMM
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleAccordian}>
            <Icon name='dropdown' />
            Schedule
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            {/* FILL */}
          </Accordion.Content>
        </Accordion>
      </Sticky>
    )
  }
}

export default StudentSidebar
