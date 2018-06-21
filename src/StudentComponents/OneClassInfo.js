import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Bar, Line} from 'react-chartjs-2';

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

  changeStateGrade = (displayedClassroom, display) => {
    let arr = []
    const assignmentDescription = displayedClassroom.assignments.map(assignment => {
      let grade = assignment.grades.find(grade => grade.student_id === parseInt(localStorage.getItem('id')))
      arr.push(grade.grade)
      return assignment.description
    })

    const colors = arr.map(grade => {
      if(grade < 65){
        return 'rgba(255, 0, 0, 0.6)'
      } else if(grade > 65 && grade < 85){
        return 'rgba(255,255,0,0.6)'
      } else{
        return 'rgba(71,183,71,0.6)'
      }
    })
    if(display == "bar"){
      this.setState(
        {chartInfo:
          {labels: assignmentDescription,
            datasets: [{data: arr, backgroundColor: colors}],
          }
        }
      )
    }else {
      this.setState({chartInfo:
        {labels: assignmentDescription,
          datasets: [{data: arr, pointBackgroundColor: colors, borderColor: `rgba(130,60,200,0.6)`, fill: false}],
        }
      })
    }

  }

  componentWillReceiveProps = (nextProps) => {
    const {displayedClassroom, display} = nextProps
    this.changeStateGrade(displayedClassroom, display)
  }

  whatToDisplay = () => {
    const {displayedClassroom} = this.props
    switch(this.props.display){
      case "bar":
        return <Bar
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

      case "line":
        return <Line
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
              backgroundColor:{
                display: false
              },
              title:{
                display: true,
                text: `Grades for ${displayedClassroom.name}`
              }
            }
          }
          data={this.state.chartInfo}/>
      default:
        return null
    }
  }

  render(){
    return(
      <div>
        {this.whatToDisplay()}
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
