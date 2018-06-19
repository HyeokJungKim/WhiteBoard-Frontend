import React, { Component } from 'react'
import {Modal, Header, Form, Segment, Icon, Button, Label} from 'semantic-ui-react'
import AssignmentAdapter from '../Adapters/AssignmentAdapter'
import {updateClassroom, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class EditAssignmentForm extends Component{
  state={
    description: "",
    file: null,

    error: "",

    hasPDF: false,
    pdfName: "",
    pdfLink: ""
  }

  componentDidMount = () => {
    AssignmentAdapter.getAssignment(this.props.assignmentID)
    .then(resp => {
      console.log(resp)
      if(resp.pdf){
        const pdfArray = resp.pdf.split("/")
          this.setState({hasPDF: true, description: resp.description, pdfName: pdfArray[pdfArray.length -1], pdfLink: resp.pdf})
      } else{
        this.setState({description: resp.description})
      }
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit = () => {
    const assignmentData = {description: this.state.description}
    let formData = null
    if(this.state.file){
      formData = new FormData()
      formData.append("pdf", this.state.file)
    }

    AssignmentAdapter.updateAssignment(this.props.assignmentID, assignmentData)
    .then(resp => {
      if(resp.error){
        this.setState({error: resp.error})
      } else if(formData){
          AssignmentAdapter.sendPDF(this.props.assignmentID, formData)
          .then(assignmentObj =>{
            if(assignmentObj.error){
              this.setState({error: assignmentObj.error})
            } else {
              this.close()
              this.props.updateClassroom(assignmentObj)
              this.props.changeDisplayedClassroom(assignmentObj)
            }
          })
      } else {
        this.close()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)
      }

    })
  }

  removePDF = () => {
    AssignmentAdapter.removePDF(this.props.assignmentID)
    .then(resp=>{
      if(resp.error){
        this.setState({error: resp.error})
      } else{
        this.close()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })
  }

  handleDelete = () => {
    AssignmentAdapter.deleteAssignment(this.props.assignmentID)
    .then(resp =>{
      if(resp.error){
        this.setState({error: resp.error})
      } else{
        this.close()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })
  }

  handleUpload = (event) => {
    this.setState({file: event.target.files[0]})
  }

  close = () => {
    this.setState({file: null, pdfName: ""})
    this.props.closeAssignmentEdit()
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <Modal size={"large"} open={this.props.editAssignment}>
        <Segment basic>
          <Header floated="right"><Icon onClick={this.props.closeAssignmentEdit} name="close"/></Header>
          <Header floated="left" icon="clipboard" content={`Edit Assignment`}></Header>
        </Segment>
        {this.state.hasPDF ?
          <Segment basic>
            <Header floated="right"><a href={`${this.state.pdfLink}`} target="_blank">{this.state.pdfName}</a></Header>
          </Segment>
          :
          null
        }
        {error}
        <Modal.Content>
          <Form>
            <Form.TextArea value={this.state.description} onChange={this.onChange} label="Assignment Description" name="description" placeholder="Assignment Description"/>

            <Form.Input type="file" onChange={this.handleUpload} />
          </Form>

            <Segment basic>
              <Button.Group>
                <Button onClick={this.handleEdit}>Edit Assignment</Button>
                {this.state.hasPDF ?
                  <Button onClick={this.removePDF} color="orange">Remove PDF</Button>
                  :
                  null
                }
                <Button color="red" onClick={this.handleDelete}>Delete Assignment</Button>
              </Button.Group>
            </Segment>

        </Modal.Content>
      </Modal>
    )
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

export default connect(null, mapDispatchToProps)(EditAssignmentForm)
