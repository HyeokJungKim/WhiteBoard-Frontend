import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import StudentGradeBook from '../StudentComponents/StudentGradeBook.js'

class StudentMainContainer extends Component{


  render(){
    return(
      <Container>
          <StudentGradeBook/>
      </Container>

    )
  }
}

export default StudentMainContainer
