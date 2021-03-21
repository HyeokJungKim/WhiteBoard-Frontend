const API = 'https://whiteboard-gradebook-backend.herokuapp.com'
class TeacherAdapter{

  static register(teacherData){
    return fetch(`${API}/teachers`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(teacherData)
    })
    .then(resp => resp.json())
  }

  static login(teacherData){
    return fetch(`${API}/teacherLogin`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(teacherData)
    })
    .then(resp => resp.json())
  }

  static checkTeacher(){
    return fetch(`${API}/teachers/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `${localStorage.getItem('token')}`
      }
    })
    .then(resp => {
      if(resp.ok){
        return resp.json()
      } else{
        throw new Error("isTeacher": false)
      }
    })
    .catch(error =>{
      return error
    })
  }

  static getClasses(){
    return fetch(`${API}/teachers/${localStorage.getItem('id')}/classrooms`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
  }




}



export default TeacherAdapter
