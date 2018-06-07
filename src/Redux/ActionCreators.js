import ClassAdapter from '../Adapters/ClassAdapter'

export const initializeTeacher = (classroomJson, forWhom) => {
  let isTeacher = false
  if(forWhom === "teacher"){
    isTeacher = true
  }
  return{
    type: 'INITIALIZETEACHER',
    payload:{
      isTeacher: isTeacher,
      classrooms: classroomJson.classrooms,
      displayedClassroom: {},
    }
  }
}

export const changeDisplayedClassroom = (classObj) => {
  return{
    type: 'CHANGEDISPLAY',
    payload:{
      displayedClassroom: classObj,
    }
  }
}
