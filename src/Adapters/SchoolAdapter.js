const API = 'http://localhost:3000'
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
