import React, { Component } from 'react'
import {Container,Grid} from 'semantic-ui-react'

import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import MainContainer from './MainContainer'

import TeacherAdapter from '../Adapters/TeacherAdapter'
import {connect} from 'react-redux'
import {initialize} from '../Redux/ActionCreators'

class HomeContainer extends Component{
  state={
    displayedClassroom: {}
  }

  componentDidMount = () => {
    TeacherAdapter.getClasses()
    .then(classes => {
      if(classes.errors){
        // FIXME: RENDER ERROR
      } else{
        this.setState({displayedClassroom: classes.classrooms[0]})
        this.props.initialize(classes, localStorage.getItem("forWhom"))
      }
    })
  }

  onClick = (id) => {
    let classToDisplay = this.props.classrooms.find(classroom => classroom.id == id)
    this.setState({displayedClassroom: classToDisplay})
  }

  render(){
    return(
      <div>
        <Header {...this.props}></Header>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Sidebar onClick={this.onClick} {...this.props}></Sidebar>
              </Grid.Column>

              <Grid.Column width={12}>
                <MainContainer displayedClassroom={this.state.displayedClassroom}></MainContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    isTeacher: state.isTeacher,
    classrooms: state.classrooms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (personObj, forWhom) =>{
      return dispatch(initialize(personObj, forWhom))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
