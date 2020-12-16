export const addStudentGroupSelector = (state) => state.models.studentGroups.addStudentGroup;
export const editStudentGroupSelector = (state) => state.models.studentGroups.editStudentGroup;
export const loadStudentGroupsSelector = (state) => state.models.studentGroups.loadStudentGroups;
export const loadStudentGroupByIdSelector = (state) => (
  state.models.studentGroups.loadStudentGroupById
);
