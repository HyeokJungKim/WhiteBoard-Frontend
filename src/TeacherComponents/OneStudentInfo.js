import React, { Component } from 'react'
import {connect} from 'react-redux'
import StudentAdapter from '../Adapters/StudentAdapter'

import {Bar} from 'react-chartjs-2';
import {Container, Icon, Segment, Header} from 'semantic-ui-react'


class OneStudentInfo extends Component{
  state={
    studentName: "",
    showChart: true,
    chartInfo: {
      labels:[],
      datasets:[]
    }
  }

  componentDidMount = () => {
    const {studentToDisplay, displayedClassroom} = this.props
    this.changeStudent(studentToDisplay, displayedClassroom)

  }

  changeStudent = (studentToDisplay, displayedClassroom) => {
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
        this.setState(
          {chartInfo:
            {labels: assignments,
              datasets: [{data: studentGrades, backgroundColor: colors}],
            },
            showChart: true
          }
        )
      } else{
        this.setState({showChart: false})
      }

    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {studentToDisplay, displayedClassroom} = nextProps
    this.changeStudent(studentToDisplay, displayedClassroom)

  }

  close = () => {
    this.setState({showChart: false})
  }

  render(){
    const {studentName} = this.state
    const {displayedClassroom} = this.props
    return(
      <Container>
        {this.state.showChart ?
          <Segment basic>
            <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
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
