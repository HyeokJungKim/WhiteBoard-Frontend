export const initializeTeacher = (classroomsJSON) => {
  return{
    type: 'INITIALIZETEACHER',
    payload:{
      isTeacher: true,
      classrooms: classroomsJSON.classrooms,
      displayedClassroom: classroomsJSON.classrooms ? classroomsJSON.classrooms[0] : null,
    }
  }
}

export const initializeStudent = (classroomsJSON) => {
  return{
    type: 'INITIALIZESTUDENT',
    payload:{
      isTeacher: false,
      classrooms: classroomsJSON.classrooms,
      displayedClassroom: classroomsJSON.classrooms[0] ? classroomsJSON.classrooms[0] : null,
    }
  }
}

export const changeDisplayedClassroom = (classroomObject) => {
  return{
    type: 'CHANGEDISPLAY',
    payload:{
      displayedClassroom: classroomObject,
    }
  }
}

export const updateClassroom = (classroomObject) =>{
  return{
    type: 'UPDATECLASSROOM',
    payload: classroomObject
  }
}
