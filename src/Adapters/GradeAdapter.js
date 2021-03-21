const API = 'https://whiteboard-gradebook-backend.herokuapp.com'
class GradeAdapter{

  static getGrade(id){
    return fetch(`${API}/grades/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      }
    })
    .then(resp => resp.json())
  }

  static editGrade(id, gradeData){
    return fetch(`${API}/grades/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(gradeData)
    })
    .then(resp => resp.json())
  }

}

export default GradeAdapter
