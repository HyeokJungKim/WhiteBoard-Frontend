import React, { Component } from 'react'
import {Modal, Header, Form, Icon, Segment} from 'semantic-ui-react'

import GradeAdapter from '../Adapters/GradeAdapter'

import {updateClassroom, changeDisplayedClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class EditGradeForm extends Component{
  state={
    grade: "",
    errors: "",
  }

  componentDidMount = () => {
    GradeAdapter.getGrade(this.props.gradeID)
    .then(resp =>{
      this.setState({grade: resp.grade})
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    const gradeData = {grade: this.state.grade}
    GradeAdapter.editGrade(this.props.gradeID, gradeData)
    .then(resp=>{
      if(resp.errors){
        this.setState({error: resp.errors})
      } else{ 
        this.props.closeEdit()
        this.props.updateClassroom(resp)
        this.props.changeDisplayedClassroom(resp)
      }
    })
  }

  render(){
    return(
      <Modal size={"small"} open={this.props.editGrade}>
        <Segment basic>
          <Header floated="right"><Icon onClick={this.props.closeEdit} name="close"/></Header>
          <Header floated="left" icon="calculator" content="Edit Grade"/>
        </Segment>
        <Modal.Content>
          <Form>
            <Form.Input type="number" value={this.state.grade} name="grade" onChange={this.handleChange}/>
            <Form.Button onClick={this.handleClick}>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGradeForm)
