import React, { Component } from 'react'
import {connect} from 'react-redux'
import StudentAdapter from '../Adapters/StudentAdapter'

import {Bar, Line} from 'react-chartjs-2';
import {Container, Icon, Segment, Header} from 'semantic-ui-react'


class OneStudentInfo extends Component{
  state={
    studentName: "",
    showChart: false,
    chartInfo: {
      labels:[],
      datasets:[],
    },
    display: "bar"
  }

  componentDidMount = () => {
    const {studentToDisplay, displayedClassroom, display} = this.props
    this.changeStudent(studentToDisplay, displayedClassroom, display)

  }

  changeStudent = (studentToDisplay, displayedClassroom, display) => {
    StudentAdapter.getGrades(studentToDisplay)
    .then(resp => {
      this.setState({studentName: `${resp.firstName} ${resp.lastName}`})
      const currentClassroom = resp.classrooms.find(classroom => classroom.id === displayedClassroom.id)
      if(currentClassroom && currentClassroom.assignments){
        const assignments = currentClassroom.assignments.map(assignment => assignment.description)
        const grades = currentClassroom.assignments.map(assignment => assignment.grades)
        const studentGrades = grades.map(gradeArr => gradeArr.find(grade => grade.student_id === parseInt(studentToDisplay)).grade)
        const colors = studentGrades.map(grade => {
          if(grade < 65){
            return 'rgba(255, 0, 0, 0.6)'
          } else if(grade > 65 && grade < 85){
            return 'rgba(255,255,0,0.6)'
          } else{
            return 'rgba(0,0,255,0.6)'
          }
        })
        if(display == "bar"){
          this.setState(
            {chartInfo:
              {labels: assignments,
                datasets: [{data: studentGrades, backgroundColor: colors}],
              },
              showChart: true
            }
          )
        } else if(display == "line"){
          this.setState({chartInfo:
            {labels: assignments,
              datasets: [{data: studentGrades, pointBackgroundColor: colors, borderColor: colors, fill: false}],
            },
            showChart: true
          })
        }

      } else{
        this.setState({showChart: false})
      }

    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {studentToDisplay, displayedClassroom, display} = nextProps
    this.changeStudent(studentToDisplay, displayedClassroom, display)
  }

  close = () => {
    this.setState({showChart: false})
    this.props.close()
  }

  whatToDisplay = () => {
    const {studentName} = this.state
    const {displayedClassroom, display} = this.props
    switch(display){
      case "bar":
      return(
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
            text: `Grades for ${studentName} in ${displayedClassroom.name}`
          }
        }
        }
        data={this.state.chartInfo}/>
      )
      case "line":
      return(
        <Line
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
            text: `Grades for ${studentName} in ${displayedClassroom.name}`
          }
        }
        }
        data={this.state.chartInfo}/>
      )

      default:
      return(
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
            text: `Grades for ${studentName} in ${displayedClassroom.name}`
          }
        }
        }
        data={this.state.chartInfo}/>
      )
    }

  }

  render(){
    return(
      <Container>
        {this.state.showChart ?
          <Segment basic>
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
            {this.whatToDisplay()}
      </Segment>
      :
      null}
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedClassroom: state.displayedClassroom,
  }
}


export default connect(mapStateToProps)(OneStudentInfo)
