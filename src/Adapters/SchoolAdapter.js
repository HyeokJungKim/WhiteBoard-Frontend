const API = 'https://whiteboard-gradebook-backend.herokuapp.com'
class SchoolAdapter{

  static getSchools(){
    return fetch(`${API}/schools`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      }
    })
    .then(resp => resp.json())
  }

  static createSchool(schoolInfo){
    return fetch(`${API}/schools`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(schoolInfo)
    })
    .then(resp => resp.json())
  }

  static validateSchool(id, schoolPassword){
    return fetch(`${API}/validateSchool/${id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(schoolPassword)
    })
    .then(resp => resp.json())
  }

  static getStudents(id, schoolData){
    return fetch(`${API}/schools/${id}/students`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(schoolData)
    })
    .then(resp => resp.json())
  }

}

export default SchoolAdapter
