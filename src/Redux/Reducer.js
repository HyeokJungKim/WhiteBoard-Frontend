const initialState= {
  isTeacher:null,
  classrooms:null,
  assignments:null,
}

const initialReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'INITIALIZE':
    console.log("HIT FROM INITILAIZE");
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default initialReducer
