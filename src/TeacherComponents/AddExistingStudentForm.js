import React, { Component } from 'react'
import {Modal, Header, Button, Segment, Icon, Form, Select} from 'semantic-ui-react'

import SchoolAdapter from '../Adapters/SchoolAdapter'

import {updateClassroom} from '../Redux/ActionCreators'
import {connect} from 'react-redux'


class AddExistingStudentForm extends Component{
  state={
    open: false,
    schools: [],
    password: "",
    schoolID: "",
    error: "",
  }

  componentDidMount = () => {
    SchoolAdapter.getSchools()
    .then(resp => {
        let schools = resp.map(school => {
          return {id:school.id, key: school.id, value: `${school.name}`, text: `${school.name}`}
        })
        this.setState({schools: schools})
    })
  }

  onClick = () => {
    this.setState({open: true})
  }

  close = () => {
    this.setState({open:false})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelect = (event) => {
    this.setState({schoolID: event.currentTarget.id})
  }

  submitForm= () => {
    const {password} = this.state
    let schoolData = {password}
    SchoolAdapter.getStudents(this.state.schoolID, schoolData)
    .then(resp =>{
      if(resp.error){
        this.setState({error: resp.error})
      } else {
        this.props.setStudents(resp)
        this.close()
      }
    })
  }

  render(){
    const error = <h4>{this.state.error}</h4>
    return(
      <div>
      <Button size="small" onClick={this.onClick} floated="right">Add Existing Student</Button>
      {this.state.open ?
        <Modal size={"large"} open={this.state.open}>
          <Segment basic>
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
            <Header icon="book" content="Add Existing Student"></Header>
            {error}
          </Segment>
          <Modal.Content>
            <Form>
              <Form.Field control={Select} label="School" onChange={this.handleSelect} placeholder="Select your school" options={this.state.schools}/>
              <Form.Input type="password" onChange={this.handleChange} label="Password" name="password" placeholder="Password"/>
              <Form.Button onClick={this.submitForm}>Find Students</Form.Button>
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
    updateClassroom: (classroomObj) =>{
      return dispatch(updateClassroom(classroomObj))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExistingStudentForm)
