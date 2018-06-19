const API = 'http://localhost:3000'
class AssignmentAdapter{

  static sendPDF(id, assignmentPDF){
    return fetch(`${API}/assignments/${id}/`, {
      method: "PATCH",
      body: assignmentPDF
    })
    .then(resp => resp.json())
  }

}

export default AssignmentAdapter
