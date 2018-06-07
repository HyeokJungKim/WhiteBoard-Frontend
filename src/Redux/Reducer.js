const initialState= {
  isTeacher:null,
  classrooms:[],
  displayedClassroom:{},
  displayedClassroomInfo:[]
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'INITIALIZE':
      return {...state, ...action.payload}
    case 'CHANGEDISPLAY':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default reducer
