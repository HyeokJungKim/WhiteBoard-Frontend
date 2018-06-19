import React, { Component } from 'react'
import {Modal, Header, Segment, Icon} from 'semantic-ui-react'

class NoStudentsAvailable extends Component{

  close = () => {
    this.props.resetStudents()
  }

  render(){
    return(
      <div>
        <Modal size={"large"} open={this.props.addExistingStudent}>
          <Segment basic>
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
            <Header icon="dont" content="There are no students registered to this school!"></Header>
          </Segment>
        </Modal>
      </div>
    )
  }
}

export default NoStudentsAvailable
