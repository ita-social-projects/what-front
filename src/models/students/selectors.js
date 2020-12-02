export const studentsSelector = (state) => state.models.students.allStudents;
export const activeStudentsSelector = (state) => state.models.students.activeStudents;
export const currentStudentSelector = (state) => state.models.students.currentStudent;
export const currentStudentGroupsSelector = (state) => state.models.students.currentStudentGroups;
export const studentIsLoadingSelector = (state) => state.models.students.isLoading;
export const studentIsLoadedSelector = (state) => state.models.students.isLoaded;
export const studentLoadingErrorSelector = (state) => state.models.students.error;
