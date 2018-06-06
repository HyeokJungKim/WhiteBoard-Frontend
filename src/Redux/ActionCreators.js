const initialize = (personObj, forWhom) => {
  let isTeacher = false
  if(forWhom === "teacher"){
    isTeacher = true
  }
  return{
    type: 'INITIALIZE',
    payload:{
      isTeacher: isTeacher,
      classrooms: personObj.classrooms,
      assignments: personObj.assignments
    }
  }
}

export default initialize
