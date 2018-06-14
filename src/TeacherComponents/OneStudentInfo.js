import React, { Component } from 'react'

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
    .then(resp => console.log(resp))
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

export default OneStudentInfo
