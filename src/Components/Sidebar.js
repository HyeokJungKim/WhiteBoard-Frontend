import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

import {connect} from 'react-redux'

import TeacherAdapter from '../Adapters/TeacherAdapter'

class Sidebar extends Component{
  state = { activeIndex: -1 }

    handleClick = (event, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }

    componentDidMount = () => {
      TeacherAdapter.getClasses()
      .then(classes => console.log(classes))
    }

    render(){
      const { activeIndex } = this.state
      console.log(this.props);
      // const classNames = this.props.classrooms.map(classroom => <p>{classroom.name}</p>)
      return (
        <div>
          <Accordion attached="bottom" fluid styled>

            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Classes
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {/**/}
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
