const API = 'http://localhost:3000'
class ClassAdapter{

  static create(classData){
    return fetch(`${API}/classrooms`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(classData)
    })
    .then(resp => resp.json())
  }

  static getStudents(id){
    return fetch(`${API}/classrooms/${id}/students`,{
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `${localStorage.getItem('token')}`,
      }
    })
    .then(resp => resp.json())
  }


}



export default ClassAdapter
