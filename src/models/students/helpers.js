export function updateStudentsData(students, newStudentData) {
  if (!students) {
    return null;
  }
  return students.map((student) => (student.id === newStudentData.id ? { ...student, ...newStudentData } : student));
}

export function removeStudentFromList(students, removableId) {
  if (!students) {
    return null;
  }
  return students.filter((student) => student.id !== removableId);
}
