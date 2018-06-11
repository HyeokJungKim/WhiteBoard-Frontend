const API = 'http://localhost:3000'
class ClassAdapter{

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

}

export default ClassAdapter
