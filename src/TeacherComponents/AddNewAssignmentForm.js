import React, { Component } from 'react'
import {Modal, Button, Header, Form, Segment, Icon} from 'semantic-ui-react'

import ClassAdapter from '../Adapters/ClassAdapter'
import AssignmentAdapter from '../Adapters/AssignmentAdapter'

import {updateClassroom, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddNewAssignmentForm extends Component{
  state={
    description: "",
    open: false,
    error: "",
    file: null
  }

  onClick = () => {
    this.setState({open:true})
  }

  close = () => {
    this.setState({open:false,
      description: "",
      error: "",
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  titleize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  handleClick = (event) => {
    const assignmentData = {description: this.titleize(this.state.description.trim())}
    let formData = null
    if(this.state.file){
      formData = new FormData()
      formData.append("pdf", this.state.file)
    }

    ClassAdapter.createAssignment(this.props.displayedClassroom.id, assignmentData)
    .then(resp =>{
      if(resp.error){
        this.setState({error: resp.error})}
      else if(formData){
        AssignmentAdapter.sendPDF(resp.assignments[resp.assignments.length - 1].id, formData)
        .then(classObj => {
          if(classObj.error){
            this.setState({error: classObj.error})
          } else {
            this.close()
            this.props.updateClassroom(classObj)
            this.props.changeDisplayedClassroom(classObj)
            this.setState({file:null})
          }
        })}
      else {
        this.close()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)}
    })
  }

  handleUpload = (event) => {
    this.setState({file: event.target.files[0]})
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <div>
        <Button size="small" floated="right" onClick={this.onClick}>Add New Assignment</Button>
        {this.state.open ?
          <Modal size={"large"} open={this.state.open}>
            <Segment basic>
              <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
              <Header floated="left" icon="pencil" content="Add New Assignment"></Header>
            </Segment>
            {error}
            <Modal.Content>
              <Form>
                <Form.TextArea value={this.state.description} onChange={this.handleChange} label="New Assignment" name="description" placeholder="Write a description for this homework assignment..."/>
                <Form.Input type="file" onChange={this.handleUpload} />
                <Form.Button onClick={this.handleClick}>Submit</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        :
          null
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    displayedClassroom: state.displayedClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassroom: (classroomObject) =>{
      return dispatch(updateClassroom(classroomObject))
    },
    changeDisplayedClassroom: (classroomObject) =>{
      return dispatch(changeDisplayedClassroom(classroomObject))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssignmentForm)
