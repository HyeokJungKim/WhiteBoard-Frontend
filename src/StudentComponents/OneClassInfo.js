import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Bar} from 'react-chartjs-2';

class OneClassInfo extends Component{
  state={
    chartInfo: {
      labels:[],
      datasets:[]
    }
  }

  componentDidMount = () => {
    const {displayedClassroom} = this.props
    if(this.props.validDisplay()){
      this.changeStateGrade(displayedClassroom)
    }
  }

  changeStateGrade = (displayedClassroom) => {
    let arr = []
    let assignmentDescription = displayedClassroom.assignments.map(assignment => {
      let grade = assignment.grades.find(grade => grade.student_id === parseInt(localStorage.getItem('id')))
      arr.push(grade.grade)
      return assignment.description
    })

    this.setState(
      {chartInfo:
        {labels: assignmentDescription,
          datasets: [{label:`Grades for ${displayedClassroom.name}`, data: arr,}],
        }
      }
    )
  }

  componentWillReceiveProps = (nextProps) => {
    const {displayedClassroom} = nextProps
    this.changeStateGrade(displayedClassroom)
  }

  render(){
    return(
      <div>
        <Bar
          options={{scales: { yAxes: [{ticks: {
              beginAtZero:true,
              min: 0,
              max: 100
            }}]}}}
          data={this.state.chartInfo}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(OneClassInfo)
