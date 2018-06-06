const initialState= {
  isTeacher:null,
  classrooms:[],
  assignments:[],
}

const initialReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'INITIALIZE':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default initialReducer
