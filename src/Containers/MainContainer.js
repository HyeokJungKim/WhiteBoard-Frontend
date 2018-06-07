import React, { Component } from 'react'
import ClassAdapter from '../Adapters/ClassAdapter'

class MainContainer extends Component{

  componentDidUpdate = () => {
    const {id} = this.props.displayedClassroom
    if (id) {
      ClassAdapter.getStudents(id)
      .then(resp=> console.log(resp))
    }
  }

  render(){
    let {name} = this.props.displayedClassroom
    return(
      <div>
        <p>{name}</p>
      </div>
    )
  }
}

export default MainContainer
