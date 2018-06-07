import React, { Component } from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'

const titleize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

class Sidebar extends Component{
  state = {
    activeIndex: -1,
  }

    handleAccordian = (event, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }

    onClick = (event) =>{
      this.props.onClick(event.target.id)
    }

    render(){
      const { activeIndex } = this.state
      const classNames = this.props.classrooms.map(classroom => <List.Item key={classroom.id} ><List.Content onClick={this.onClick} id={classroom.id}>{titleize(classroom.name)}</List.Content></List.Item>)
      return (
        <div>
          <Accordion attached="bottom" fluid styled>

            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordian}>
              <Icon name='dropdown' />
              Classes
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <List>
                {classNames}
              </List>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordian}>
              <Icon name='dropdown' />
              Grades
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              {/* FILL */}
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



export default Sidebar
