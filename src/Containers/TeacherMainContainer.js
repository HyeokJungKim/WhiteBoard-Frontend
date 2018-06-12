import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import TeacherGradeBook from '../TeacherComponents/TeacherGradeBook.js'

class TeacherMainContainer extends Component{

  whatToDisplay = () => {
    switch(this.props.display){
      case "GradeBook":
        return <TeacherGradeBook/>
      case "Information":
        return <p>{this.props.display}</p>
      default:
        return <TeacherGradeBook/>
    }
  }

  render(){
    return(
      <Container>
        {this.whatToDisplay()}
      </Container>

    )
  }
}

export default TeacherMainContainer
