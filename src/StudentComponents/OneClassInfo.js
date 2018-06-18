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

    let colors = arr.map(grade => {
      if(grade < 65){
        return 'rgba(255, 0, 0, 0.6)'
      } else if(grade > 65 && grade < 85){
        return 'rgba(255,255,0,0.6)'
      } else{
        return 'rgba(0,0,255,0.6)'
      }
    })

    this.setState(
      {chartInfo:
        {labels: assignmentDescription,
          datasets: [{data: arr, backgroundColor: colors}],
        }
      }
    )
  }

  componentWillReceiveProps = (nextProps) => {
    const {displayedClassroom} = nextProps
    this.changeStateGrade(displayedClassroom)
  }

  render(){
    const {displayedClassroom} = this.props
    return(
      <div>
        <Bar
          options={{
            scales: {
              yAxes:
              [{ticks: {
                beginAtZero:true,
                min: 0,
                max: 100}}]
              },
              legend:{
                display:false
              },
              title:{
                display: true,
                text: `Grades for ${displayedClassroom.name}`
              }
            }
          }
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
