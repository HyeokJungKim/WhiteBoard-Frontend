import React, { Component } from 'react'
import {Container,Grid} from 'semantic-ui-react'

import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import MainContainer from './MainContainer'

import TeacherAdapter from '../Adapters/TeacherAdapter'
import StudentAdapter from '../Adapters/StudentAdapter'

import {connect} from 'react-redux'
import {initializeTeacher, changeDisplayedClassroom, initializeStudent} from '../Redux/ActionCreators'

class HomeContainer extends Component{
  state={
    display: "",
  }

  componentDidMount = () => {
    TeacherAdapter.checkTeacher()
      .then(json=>{
        if(json.isTeacher){
          TeacherAdapter.getClasses()
          .then(classes => {
            this.props.initializeTeacher(classes)
          })
        } else{
          StudentAdapter.getClasses()
          .then(classes =>{
            this.props.initializeStudent(classes)
          })
        }
      })
    // TeacherAdapter.getClasses()
    // .then(classes => {
    //   if(classes.errors){
    //     // FIXME: RENDER ERROR
    //   } else{
    //     this.props.initializeTeacher(classes, localStorage.getItem("forWhom"))
    //   }
    // })
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
    initializeTeacher: (personObj) =>{
      return dispatch(initializeTeacher(personObj))
    },
    initializeStudent: (personObj) =>{
      return dispatch(initializeStudent(personObj))
    },
    changeDisplayedClassroom: (classObj) =>{
      return dispatch(changeDisplayedClassroom(classObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
