const mockStudentsSelector = {
  email: 'student@gmail.com',
  firstName: 'student',
  id: 1,
  lastName: 'student',
};

const mockLoadStudentsGroup = [
  { id: 2, name: 'DP-18' },
  { id: 14, name: 'DP-20' },
];

const mockStudentGroups = [
  { id: 1, name: '122-18-3' },
  { id: 21, name: 'cTevmNi' },
  { id: 23, name: 'dVLkvAZ' },
];

export const mockCurrentStudentSelector = {
  data: mockStudentsSelector,
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mockLoadStudentsGroupSelector = {
  data: mockLoadStudentsGroup,
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mockCurrentStudentGroupsSelector = {
  data: mockStudentGroups,
  isLoading: false,
};