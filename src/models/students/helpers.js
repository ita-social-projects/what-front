export function updateStudentsData(students, newStudentData) {
  // eslint-disable-next-line max-len
  return students.map((student) => (student.id === newStudentData.id ? { ...student, ...newStudentData } : student));
}

export function removeStudentFromList(students, removableId) {
  return students.filter((student) => student.id !== removableId);
}
