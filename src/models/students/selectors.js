export const studentsSelector = (state) => state.models.students.students;
export const activeStudentsSelector = (state) => state.models.students.activeStudents;
export const currentStudentSelector = (state) => state.models.students.studentById;
export const currentStudentGroupsSelector = (state) => state.models.students.studentByIdGroups;
export const editStudentSelector = (state) => state.models.students.editStudent;
export const addStudentSelector = (state) => state.models.students.addStudent;
export const removeStudentSelector = (state) => state.models.students.removeStudent;
export const reactivateStudentSelector = (state) => state.models.students.reactivateStudent;
