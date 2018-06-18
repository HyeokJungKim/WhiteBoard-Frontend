import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'

import TeacherGradeBook from '../TeacherComponents/TeacherGradeBook.js'
import CreateClassForm from '../TeacherComponents/CreateClassForm'
import TeacherInformationForStudent from '../TeacherComponents/TeacherInformationForStudent.js'

class TeacherMainContainer extends Component{

  validDisplay = () => {
    const {displayedClassroom} = this.props
    return displayedClassroom && displayedClassroom.assignments && displayedClassroom.students
  }

  whatToDisplay = () => {
    switch(this.props.display){
      case "GradeBook":
        return <TeacherGradeBook validDisplay={this.validDisplay}/>
      case "Information":
        return <TeacherInformationForStudent validDisplay={this.validDisplay}/>
      default:
        return <TeacherGradeBook validDisplay={this.validDisplay}/>
    }
  }

  render(){
    return(
      <Container>
        {this.whatToDisplay()}
        {this.props.addClassForm ?
          <CreateClassForm addClassForm={this.props.addClassForm} closeForm={this.props.closeForm}/>
          :
          null
        }
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}

export default connect(mapStateToProps)(TeacherMainContainer)
