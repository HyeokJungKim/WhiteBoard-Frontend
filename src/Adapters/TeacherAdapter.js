class TeacherAdapter{

  static register(teacherData){
    return fetch("http://localhost:3000/teachers",{
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(teacherData)
    })
    .then(resp => resp.json())
  }
}

export default TeacherAdapter
