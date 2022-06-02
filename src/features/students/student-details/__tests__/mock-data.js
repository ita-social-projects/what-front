const mockStudentsSelector = {
  email: "student@gmail.com",
  firstName: "student",
  id: 1,
  lastName: "student"
}

const mockStudentGroups = [
  {id: 1, name: "122-18-3"},
  {id: 21, name: "cTevmNi"},
  {id: 23, name: "dVLkvAZ"}
]

const mockStudentLessons = [
  {
    comment: null,
    id: 2,
    lessonDate: "2021-06-26T16:53:34",
    mark: null,
    presence: false,
    studentGroupId: 1,
    themeName: "Junit"
  },
  {
    comment: null,
    id: 3,
    lessonDate: "2021-06-27T15:53:34",
    mark: 2,
    presence: true,
    studentGroupId: 1,
    themeName: "TestNG"
  },
  {
    comment: null,
    id: 4,
    lessonDate: "2021-06-26T21:53:34",
    mark: 9,
    presence: true,
    studentGroupId: 1,
    themeName: "Testing Techniques"
  }
]

export const mockCurrentStudentSelector = {
  data: mockStudentsSelector,
  isLoading: false,
  isLoaded: true,
  error: '',
}

export const mockCurrentStudentGroupsSelector = {
  data: mockStudentGroups,
  isLoading: false,
}

export const mockStudentsLessonsSelector = {
  data: mockStudentLessons,
  isLoading: false,
  isLoaded: true,
}