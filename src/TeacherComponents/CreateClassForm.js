import React, { Component } from 'react'
import {Modal, Header, Form, Segment, Icon} from 'semantic-ui-react'
import ClassAdapter from '../Adapters/ClassAdapter'
import {addClassroom, initializeTeacher} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class CreateClassForm extends Component{
  state={
    className: "",
    error: ""
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
    const {className} = this.state
    const classroomInfo = {teacherID: localStorage.getItem('id'), name: className}
    ClassAdapter.createClass(classroomInfo)
    .then(resp => {
      if(resp.error){
        this.setState({error: resp.error})
      } else{
        if(this.props.firstTime){
          this.props.history.push('/home')
          this.props.closeFirstTime()
          this.props.initializeTeacher(resp)
        }else{
          this.props.closeForm()
          this.props.addClassroom(resp)
        }

      }
    })
  }

  close = () => {
    if(this.props.firstTime){
      this.setState({error: "You need to create a class first!"})
    }else{
      this.props.closeForm()
    }
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <Modal size={"large"} open={this.props.addClassForm}>
        <Segment basic>
          {this.props.firstTime ?
            null
            :
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
          }
          <Header floated="left" icon="clipboard" content="Add New Class"></Header>
        </Segment>
        {error}
        <Modal.Content>
          <Form>
            <Form.Input value={this.state.className} onChange={this.onChange} label="Class Name" name="className" placeholder="Class Name"/>
            <Form.Button onClick={this.handleClick}>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addClassroom: (classroomJSON) =>{
      return dispatch(addClassroom(classroomJSON))
    },
    initializeTeacher: (classroomsJSON) =>{
      return dispatch(initializeTeacher(classroomsJSON))
    },
  }
}

export default connect(null, mapDispatchToProps)(CreateClassForm)
