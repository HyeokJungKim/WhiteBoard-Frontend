import React, { Component } from 'react'
import {Container,Grid} from 'semantic-ui-react'

import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import MainContainer from './MainContainer'

import TeacherAdapter from '../Adapters/TeacherAdapter'
import {connect} from 'react-redux'
import {initialize, changeDisplayedClassroom} from '../Redux/ActionCreators'

class HomeContainer extends Component{
  state={
    display: "",
  }

  componentDidMount = () => {
    TeacherAdapter.getClasses()
    .then(classes => {
      if(classes.errors){
        // FIXME: RENDER ERROR
      } else{
        this.props.initialize(classes, localStorage.getItem("forWhom"))
      }
    })
  }

  onClick = (id) => {
    let classToDisplay = this.props.classrooms.find(classroom => classroom.id == id)
    this.props.changeDisplayedClassroom(classToDisplay)
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
                <MainContainer></MainContainer>
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
    displayedClassroom: state.displayedClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (personObj, forWhom) =>{
      return dispatch(initialize(personObj, forWhom))
    },
    changeDisplayedClassroom: (classObj) =>{
      return dispatch(changeDisplayedClassroom(classObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
