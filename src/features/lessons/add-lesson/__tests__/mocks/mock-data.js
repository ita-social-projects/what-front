
export const groupsMock= [
    {
        courseId: 9,
        finishDate: "2022-06-16T00:00:00",
        id: 1,
        mentorIds: [9],
        name: "122-18-3",
        startDate: "2021-05-16T00:00:00",
        studentIds: [1, 3]
    },
    {
        courseId: 1,
        finishDate: "2022-06-16T00:00:00",
        id: 2,
        mentorIds: [1],
        name: "122-18-2",
        startDate: "2021-04-16T00:00:00",
        studentIds: [2, 11, 12, 13, 16, 33, 42, 43, 44, 46]
    }
];

export const mentorsMock = [
    {
        avatarUrl: null,
        email: "alexiscahn40@what_WH.at",
        firstName: "MeurigMent",
        id: 9,
        lastName: "MeurigMento"
    }
];

export const studentsMock = [
    {
        avatarUrl: null,
        email: "student@gmail.com",
        firstName: "Student",
        id: 1,
        lastName: "Student",
    },
    {
        avatarUrl: null,
        email: "StudenT01@gmail.com",
        firstName: "StudenT",
        id: 3,
        lastName: "StudenT",
    }
];

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

