import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import ClassAdapter from '../Adapters/ClassAdapter'

class GradeBook extends Component{

  componentDidUpdate = () => {
    const {id} = this.props.displayedClassroom
    if (id) {
      ClassAdapter.getStudents(id)
      .then(resp=> console.log(resp))
    }
  }

  render(){

    return(
      <Container>
        <h2>{this.props.displayedClassroom.name}</h2>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom
  }
}


export default connect(mapStateToProps)(GradeBook)
