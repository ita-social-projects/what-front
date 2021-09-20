const mockStudentsSelector = {
  email: 'student@gmail.com',
  firstName: 'StudentName',
  id: 1,
  lastName: 'StudentSurname',
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
  isLoaded: false,
  error: '',
};

export const mockEditStudentSelector = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mockRemoveStudentSelector = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

const useStates = {
  groups: {
    groups: mockStudentGroups || 0,
    setGroups: jest.fn(),
  },
  studGroups: {
    initialGroups: mockLoadStudentsGroup || 0,
    setInitialGroups: jest.fn(),
  },
  errorGroup: {
    mentorInput: null,
    setErrorGroup: jest.fn(),
  },
};

const useStateMock = {
  default: jest.fn()
    .mockReturnValue([useStates.groups.groups, useStates.groups.setGroups])
    .mockReturnValue([useStates.studGroups.initialGroups, useStates.studGroups.setInitialGroups])
    .mockReturnValue([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup]),
};

export { useStates, useStateMock };