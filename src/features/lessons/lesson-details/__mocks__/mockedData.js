export const lessonsMock = [
  {
    id: 1,
    themeName: 'Sxwqs',
    mentorId: 1,
    studentGroupId: 1,
    lessonDate: '2021-10-15T22:39:00',
    lessonVisits: [
      {
        studentId: 1,
        studentMark: 12,
        presence: true,
        comment: '',
      },
      {
        studentId: 2,
        studentMark: 4,
        presence: false,
        comment: '',
      },
    ],
  },
  {
    id: 2,
    themeName: 'Editedname',
    mentorId: 2,
    studentGroupId: 1,
    lessonDate: '2020-03-02T22:02:00',
    lessonVisits: [
      {
        studentId: 1,
        studentMark: 12,
        presence: true,
        comment: '',
      },
      {
        studentId: 2,
        studentMark: 12,
        presence: false,
        comment: '',
      },
    ],
  },
];

export const mentorsMock = [
  {
    id: 1,
    email: 'michael.taylor@example.com',
    firstName: 'Michael',
    lastName: 'Taylor',
    avatarUrl:
      'https://whatbackendstorageacc.blob.core.windows.net/28edbc17f2394a5c967e5f5568bc523a/7.jpg',
  },
  {
    id: 2,
    email: 'william.davies@example.com',
    firstName: 'William',
    lastName: 'Davies',
    avatarUrl:
      'https://whatbackendstorageacc.blob.core.windows.net/bd18d83832094662877fdd44ded8ca63/9.jpg',
  },
];

export const studentsMock = [
  {
    id: 1,
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
    avatarUrl:
      'https://whatbackendstorageacc.blob.core.windows.net/32f19972bebb42a689104071a11c5e33/11.jpg',
  },
  {
    id: 2,
    email: 'richard.thomas@example.com',
    firstName: 'Richard',
    lastName: 'Thomas',
    avatarUrl:
      'https://whatbackendstorageacc.blob.core.windows.net/fbbfa551fede45f5940ca750a3f7986b/13.jpg',
  },
];

export const groupsMock = [
  {
    id: 1,
    courseId: 1,
    name: 'Soft Skills for Lecturers - 2021/2',
    startDate: '2021-07-05T00:00:00',
    finishDate: '2021-12-24T00:00:00',
    studentIds: [1, 2],
    mentorIds: [1, 2],
  },
];

export const formDataMock = [
  {
    studentId: 1,
    studentMark: 4,
    presence: true,
    comment: '',
    studentName: 'David Brown',
  },
  {
    studentId: 2,
    studentMark: null,
    presence: true,
    comment: '',
    studentName: 'Richard Thomas',
  },
];
