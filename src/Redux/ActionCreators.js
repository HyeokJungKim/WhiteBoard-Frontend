export const initializeTeacher = (classroomJson) => {
  return{
    type: 'INITIALIZETEACHER',
    payload:{
      isTeacher: true,
      classrooms: classroomJson.classrooms,
      displayedClassroom: classroomJson.classrooms ? classroomJson.classrooms[0] : null,
    }
  }
}

export const initializeStudent = (classroomJson) => {
  return{
    type: 'INITIALIZESTUDENT',
    payload:{
      isTeacher: false,
      classrooms: classroomJson.classrooms,
      displayedClassroom: classroomJson.classrooms[0] ? classroomJson.classrooms[0] : null,
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
