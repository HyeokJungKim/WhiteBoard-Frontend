import React, { Component } from 'react'
import {List, Segment, Sticky} from 'semantic-ui-react'

class StudentSidebar extends Component{

  titleize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  changeClassDisplay = (event) =>{
    this.props.changeClassDisplay(event.target.id)
  }

  render(){
    const classNames = this.props.classrooms.map(classroom => <List.Item className="hover" key={classroom.id}><Segment id={classroom.id} onClick={this.changeClassDisplay} basic><List.Content id={classroom.id} >{this.titleize(classroom.name)}</List.Content></Segment></List.Item>)
    return (
      <Sticky>
        <Segment basic>
          <List divided relaxed animated verticalAlign="middle">
            {classNames}
          </List>
        </Segment>
      </Sticky>
    )
  }
}

export default StudentSidebar
