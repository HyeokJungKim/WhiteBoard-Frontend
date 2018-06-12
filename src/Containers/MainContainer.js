import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import TeacherGradeBook from '../Components/TeacherGradeBook.js'
import StudentGradeBook from '../Components/StudentGradebook.js'

class MainContainer extends Component{


  render(){
    return(
      <Container>
        {this.props.isTeacher ?
          <TeacherGradeBook/>
        :
          <StudentGradeBook/>
        }
      </Container>

    )
  }
}

export default MainContainer
