const API = 'http://localhost:3000'
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
