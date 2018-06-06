import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

import {connect} from 'react-redux'

class Sidebar extends Component{
  state = { activeIndex: -1 }

    handleClick = (event, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }

    render(){
      console.log(this.props)
      const { activeIndex } = this.state
      return (
        <div>
          <Accordion attached="bottom" fluid styled>

            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Classes
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {/* FILL */}
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Grades
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              {/* FILL */}
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
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

const mapStateToProps = (state) => {
  return{
    isTeacher:state.isTeacher,
    classrooms:state.classrooms,
    assignments:state.assignments,
  }
}

export default connect(mapStateToProps)(Sidebar)
