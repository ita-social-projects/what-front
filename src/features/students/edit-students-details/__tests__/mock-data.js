const mockStudentsSelector = {
  email: 'student@gmail.com',
  firstName: 'Vova',
  id: 1,
  lastName: 'Zenin',
};

const mockLoadStudentGroups = [
  {
    id: 212,
    courseId: 17,
    name: 'SX-13',
    startDate: '2015-07-20T00:00:00',
    finishDate: '2015-09-20T00:00:00',
    studentIds: [
      33,
      42,
      43,
    ],
    mentorIds: [
      12,
      43,
    ],
  },
  {
    id: 214,
    courseId: 18,
    name: 'SX-15',
    startDate: '2016-07-20T00:00:00',
    finishDate: '2016-09-20T00:00:00',
    studentIds: [
      11,
      46,
      38,
    ],
    mentorIds: [
      13,
      47,
    ],
  },
];

const mockStudentGroups = [
  { id: 2, name: 'DP-18' },
  { id: 14, name: 'DP-20' },
];

export const mockCurrentStudentSelector = {
  data: mockStudentsSelector,
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mockLoadStudentGroupsSelector = {
  data: mockLoadStudentGroups,
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

export const useActionsFns = {
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
  dispatchAddAlert: jest.fn(),
};