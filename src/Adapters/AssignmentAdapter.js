const API = 'https://whiteboard-gradebook-backend.herokuapp.com'
class AssignmentAdapter{

  static getAssignment(id){
    return fetch(`${API}/assignments/${id}/`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
    })
    .then(resp => resp.json())
  }

  static updateAssignment(id, assignmentData){
    return fetch(`${API}/assignments/${id}/update`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(assignmentData)
    })
    .then(resp => resp.json())
  }

  static deleteAssignment(id){
    return fetch(`${API}/assignments/${id}/`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      }
    })
    .then(resp => resp.json())
  }

  static sendPDF(id, assignmentPDF){
    return fetch(`${API}/assignments/${id}/`, {
      method: "PATCH",
      body: assignmentPDF
    })
    .then(resp => resp.json())
  }

  static removePDF(id){
    return fetch(`${API}/assignments/${id}/removePDF`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: {pdf: null}
    })
    .then(resp => resp.json())
  }

}

export default AssignmentAdapter
