import React, { Component } from 'react'
import {Modal, Header, Form, Segment, Icon} from 'semantic-ui-react'
import StudentAdapter from '../Adapters/StudentAdapter'

import {initializeStudent} from '../Redux/ActionCreators'
import {connect} from 'react-redux'

class ResetInformation extends Component{
  state={
    open: true,
    username: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
    const {username, password, passwordConfirmation} = this.state
    if(password === passwordConfirmation){
      const studentData = {username, password}
      StudentAdapter.updateInformation(localStorage.getItem('id'), studentData)
      .then(resp => {
        if(resp.errors){
          this.setState({errors: resp.errors})
        } else {
          this.props.history.push('/home')
          this.props.initializeStudent(resp)
        }
      })
    }
    else {
      this.setState({errors:["Password confirmation does not match password."]})
    }
  }

  render(){
    const errors = this.state.errors.map(error => <h4>{error}</h4>)
    return(
      <Modal size={"large"} open={this.state.open}>
        <Segment basic>
          <Header floated="left" icon="edit" content="Change User Information"></Header>
        </Segment>
        {errors}
        <Modal.Content>
          <Form>
            <Form.Input value={this.state.username} onChange={this.onChange} label="Enter Your New Username" name="username" placeholder="Username"/>
              <Form.Input onChange={this.onChange} value={this.state.password} type="password" label="Password" name="password" placeholder="Password" />
              <Form.Input onChange={this.onChange} value={this.state.passwordConfirmation} type="password" label="Password Confirmation" name="passwordConfirmation" placeholder="Password Confirmation" />
            <Form.Button onClick={this.handleClick}>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeStudent: (classroomsJSON) =>{
      return dispatch(initializeStudent(classroomsJSON))
    },
  }
}

export default connect(null, mapDispatchToProps)(ResetInformation)
