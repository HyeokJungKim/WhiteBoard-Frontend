import React, { Component } from 'react'
import {connect} from 'react-redux'
import StudentAdapter from '../Adapters/StudentAdapter'

import {Container} from 'semantic-ui-react'
import {Bar} from 'react-chartjs-2';

class OneStudentInfo extends Component{
  state={
    grades: [],
    assignments: [],
  }

  componentDidMount = () => {
    StudentAdapter.getGrades(this.props.studentToDisplay)
    .then(resp => {
      const display = resp.classrooms.find(classroom => classroom.id === this.props.displayedClassroom.id)
      console.log(display)
    })
  }

  render(){
    return(
      <div>
        {this.props.studentToDisplay}
        FIGURE OUT HOW TO FILTER GRADES APPROPRIATELY
        <Bar>
        </Bar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(OneStudentInfo)
