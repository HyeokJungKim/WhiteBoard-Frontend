const initialState = {
  isTeacher: null,
  classrooms:[],
  displayedClassroom:{},
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'INITIALIZETEACHER':
      return {...state, ...action.payload}
    case 'CHANGEDISPLAY':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default reducer
