const initialize = (personObj) => {
  return{
    type: 'INITIALIZE',
    payload:{
      classrooms: personObj.classrooms,
      assignments: personObj.assignments
    }
  }
}

export default initialize
