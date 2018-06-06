const API = 'http://localhost:3000'
class TeacherAdapter{

  static register(teacherData){
    return fetch(`${API}/teachers`,{
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(teacherData)
    })
    .then(resp => resp.json())
  }

  static login(teacherData){
    return fetch(`${API}/teacherLogin`,{
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(teacherData)
    })
    .then(resp => resp.json())
  }
}

export default TeacherAdapter
