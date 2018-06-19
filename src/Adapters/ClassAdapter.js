const API = 'http://localhost:3000'
class ClassAdapter{

  static createClass(classroomInfo){
    return fetch(`${API}/classrooms`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(classroomInfo)
    })
    .then(resp => resp.json())
  }

  static createAssignment(id, assignmentData){
    return fetch(`${API}/classrooms/${id}/assignments`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(assignmentData)
    })
    .then(resp => resp.json())
  }


  static addStudent(id, studentsArr){
    return fetch(`${API}/classrooms/${id}/students`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(studentsArr)
    })
    .then(resp => resp.json())
  }

}

export default ClassAdapter
