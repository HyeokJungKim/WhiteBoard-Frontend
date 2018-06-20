import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
import {Container, Icon, Segment, Header} from 'semantic-ui-react'

class AssignmentChart extends Component{
  state={
    chartInfo: {
      labels:[],
      datasets:[],
    }
  }

  componentDidMount = () => {
    const {assignment} = this.props
    this.setData(assignment)
  }

  componentWillReceiveProps = (nextProps) => {
    const {assignment} = nextProps
    this.setData(assignment)
  }

  setData = (assignment) => {
    let range1 = 0
    let range2 = 0
    let range3 = 0

    assignment.grades.forEach(grade => {
      if(grade.grade < 65){
        range1 += 1
      } else if (grade.grade >=65 && grade.grade <= 85){
        range2 += 1
      } else if (grade.grade > 85){
        range3 += 1
      }
    })
    const gradeCount = [range1, range2, range3]

    this.setState({chartInfo: {
      labels: ["Less than 65", "65 to 85", "Greater than 85"],
      datasets: [{data: gradeCount, backgroundColor:['rgba(255, 0, 0, 0.6)', 'rgba(255,255,0,0.6)', 'rgba(71,183,71,0.6)']}]
    }})
  }

  close = () => {
    this.props.close()
  }

  render(){
    const {assignment} = this.props
    return(
      <Container>
        <Segment basic>
          <Header floated="right"><Icon onClick={this.close} name="close"/></Header>
          <Doughnut
            options={{
              title:{
                display: true,
                text: `Grades Distribution for ${assignment.description}`
              }
            }}
            data={this.state.chartInfo}>
          </Doughnut>
        </Segment>
      </Container>
    )
  }
}

export default AssignmentChart
