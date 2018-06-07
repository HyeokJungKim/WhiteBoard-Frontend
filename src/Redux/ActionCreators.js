import ClassAdapter from '../Adapters/ClassAdapter'

export const initialize = (personObj, forWhom) => {
  let isTeacher = false
  if(forWhom === "teacher"){
    isTeacher = true
  }
  return{
    type: 'INITIALIZE',
    payload:{
      isTeacher: isTeacher,
      classrooms: personObj.classrooms,
      displayedClassroom: personObj.classrooms[0]
    }
  }
}



export const changeDisplayedClassroom = (classObj) => {
  return (dispatch) => {
    ClassAdapter.getStudents(classObj.id)
    .then(resp => {
      dispatch({
        type: 'CHANGEDISPLAY',
        payload:{
          displayedClassroom: classObj,
          displayedClassroomInfo: resp
        }
      })
    })
  }
}
