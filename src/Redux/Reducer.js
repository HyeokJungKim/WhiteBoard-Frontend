const initialState = {
  isTeacher: true,
  classrooms:[],
  displayedClassroom: {},
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'INITIALIZETEACHER':
      return {...state, ...action.payload}

    case 'INITIALIZESTUDENT':
      return {...state, ...action.payload}

    case 'UPDATECLASSROOM':
    let classrooms = [...state.classrooms]
      let index = classrooms.findIndex(classroom => parseInt(classroom.id) == action.payload.id)
      classrooms[index] = action.payload
      return {...state, classrooms:[...classrooms], displayedClassroom: action.payload}

    case 'CHANGEDISPLAY':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default reducer
