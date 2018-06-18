import React, { Component } from 'react'
import {Container,Grid} from 'semantic-ui-react'

import Header from '../Components/Header'

import StudentSidebar from '../StudentComponents/StudentSidebar.js'
import StudentMainContainer from './StudentMainContainer'

import TeacherSidebar from '../TeacherComponents/TeacherSidebar'
import TeacherMainContainer from './TeacherMainContainer'

import TeacherAdapter from '../Adapters/TeacherAdapter'
import StudentAdapter from '../Adapters/StudentAdapter'

import {connect} from 'react-redux'
import {initializeTeacher, changeDisplayedClassroom, initializeStudent} from '../Redux/ActionCreators'

class HomeContainer extends Component{
  state={
    display: "",
    addClassForm: false,
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
  }

  changeClassDisplay = (id) => {
    this.setState({display:"GradeBook"})
    let classToDisplay = this.props.classrooms.find(classroom => classroom.id == id)
    this.props.changeDisplayedClassroom(classToDisplay)
  }

  changeStudentInfoDisplay = (id) => {
    this.setState({display:"Information"})
    let classToDisplay = this.props.classrooms.find(classroom => classroom.id == id)
    this.props.changeDisplayedClassroom(classToDisplay)
  }

  renderForm = () => {
    this.setState({addClassForm: true})
  }

  closeForm = () => {
    this.setState({addClassForm: false})
  }

  render(){
    return(
      <div>
        <Header {...this.props}></Header>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                {this.props.isTeacher ?
                  <TeacherSidebar renderForm={this.renderForm} changeStudentInfoDisplay={this.changeStudentInfoDisplay} changeClassDisplay={this.changeClassDisplay} {...this.props}/>
                  :
                  <StudentSidebar changeClassDisplay={this.changeClassDisplay} {...this.props}/>
                }
              </Grid.Column>

              <Grid.Column width={12}>
                {this.props.isTeacher ?
                  <TeacherMainContainer closeForm={this.closeForm} addClassForm={this.state.addClassForm} display={this.state.display}/>
                  :
                  <StudentMainContainer/>
                }
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
    initializeTeacher: (classroomJSON) =>{
      return dispatch(initializeTeacher(classroomJSON))
    },
    initializeStudent: (classroomJSON) =>{
      return dispatch(initializeStudent(classroomJSON))
    },
    changeDisplayedClassroom: (classObj) =>{
      return dispatch(changeDisplayedClassroom(classObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
