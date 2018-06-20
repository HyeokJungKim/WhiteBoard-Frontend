import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import {connect} from 'react-redux'

import StudentGradeBook from '../StudentComponents/StudentGradeBook.js'

class StudentMainContainer extends Component{


  render(){
    return(
      <Container fluid>
          <StudentGradeBook/>
      </Container>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}

export default connect(mapStateToProps)(StudentMainContainer)
