const initialState = {
  isTeacher: null,
  classrooms:[],
  displayedClassroom: {},
}

const reducer = (state = initialState, action) =>{
  let index = -1
  let classrooms = [...state.classrooms]
  switch(action.type){
    case 'INITIALIZETEACHER':
      return {...state, ...action.payload}

    case 'INITIALIZESTUDENT':
      return {...state, ...action.payload}

    case 'ADDNEWASSIGNMENT':
      index = classrooms.forEach((classroom, index) => {
        if(classroom.id === action.payload.id){
          return index
        }
      })
      classrooms[index] = action.payload
      return {...state, classrooms:[...classrooms]}

    case 'ADDNEWSTUDENT':
      index = classrooms.forEach((classroom, index) => {
        if(classroom.id === action.payload.id){
          return index
        }
      })
      classrooms[index] = action.payload
      return {...state, classrooms:[...classrooms]}

    case 'CHANGEDISPLAY':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default reducer
