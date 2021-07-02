export const groupsMock= [
  {
    id: 25,
    name: "aKkIUEM",
  },
  {
    id: 27,
    name: "amCEDGh",
  }
];

export const deletedGroupsMock= [
  {
    id: 25,
    name: "aKkIUEM",
  },
];

export const mentorsMock = [
  {
    email: "name_ment@gmail.com",
    firstName: "FirstNameMent",
    id: 4,
    lastName: "LastNameMent"
  }
];

export const coursesMock = [
  {
    id: 4,
    name: "Azure for newcomers",
  },
  {
    id: 3,
    name: "1 course about nothing",
  }
];

export const deletedCoursesMock= [
  {
    id: 3,
    name: "1 course about nothing",
  },
];

export const allGroupsMock= [
  {
    courseId: 9,
    finishDate: "2022-06-16T00:00:00",
    id: 1,
    mentorIds: [9],
    name: "122-18-3",
    startDate: "2021-05-16T00:00:00",
    studentIds: [3, 4, 23, 26, 35, 1]
  },
  {
    courseId: 1,
    finishDate: "2022-06-16T00:00:00",
    id: 2,
    mentorIds: [1],
    name: "122-18-2",
    startDate: "2021-04-16T00:00:00",
    studentIds: [2, 11, 12, 13, 16, 33, 42, 43, 44, 46]
  },
  {
    courseId: 9,
    finishDate: "2022-06-16T00:00:00",
    id: 3,
    mentorIds: [9],
    name: "Advanced",
    startDate: "2020-06-16T00:00:00",
    studentIds: [9, 10, 14, 15, 17, 18, 19, 20, 27, 32, 34, 1]
  },
];

export const allCoursesMock= [
  {
    id: 1,
    isActive: true,
    name: "123 Testing",
  },
  {
    id: 2,
    isActive: true,
    name: "122 Testing",
  },
  {
    id: 3,
    isActive: true,
    name: "1 course about nothing",
  },
];

export const submitForm = {
  mentorFirst: 'MentorName',
  mentorLast: 'MentorLastName',
  mentorEmail: 'MentorEmail@gmail.com',
}

export const formData = {
  default: [
    {studentId: 1, studentMark: 0, presence: false, comment: "", studentName: "Student Student"},
    {studentId: 3, studentMark: 0, presence: false, comment: "", studentName: "StudenT StudenT"}],

  formDataMockPresent: [
    {studentId: 1, studentMark: 0, presence: true, comment: "", studentName: "Student Student"},
    {studentId: 3, studentMark: 0, presence: true, comment: "", studentName: "StudenT StudenT"}],

  formDataMockSubmit: [
    {studentId: 1, studentMark: 10, presence: true, comment: "", studentName: "Student Student"},
    {studentId: 3, studentMark: 0, presence: true, comment: "", studentName: "StudenT StudenT"}]
};