import React, { Component } from 'react'
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
      let arr = []
      let assignmentDescription = displayedClassroom.assignments.map(assignment => {
        let grade = assignment.grades.find(grade => grade.student_id === parseInt(localStorage.getItem('id')))
        arr.push(grade.grade)
        return assignment.description
      })
      this.setState(
        {chartInfo:
          {labels: assignmentDescription,
            datasets: [{label:`Grades for ${displayedClassroom.name}`, data: arr}],
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                  }
                }]
              }
            },
          }
        }
      )
    }
  }

  render(){
    console.log(this.state.chartInfo);
    return(
      <div>
        <Bar options={{}} data={this.state.chartInfo}/>
      </div>
    )
  }
}



export default (OneClassInfo)
