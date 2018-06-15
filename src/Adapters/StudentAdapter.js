const API = 'http://localhost:3000'
class StudentAdapter{

  static register(studentData){
    return fetch(`${API}/students`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(studentData)
    })
    .then(resp => resp.json())
  }

  static login(studentData){
    return fetch(`${API}/studentLogin`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(studentData)
    })
    .then(resp => resp.json())
  }

  static getClasses(){
    return fetch(`${API}/students/${localStorage.getItem('id')}/classrooms`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
  }

  static getGrades(id){
    return fetch(`${API}/students/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      }
    })
    .then(resp => resp.json())
  }
  
}


export default StudentAdapter
