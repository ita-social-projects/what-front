
export const lessonsDataMock = {
    lessons: [
        {
            id: 1,
            lessonDate: "2021-06-16T23:47:00",
            lessonVisits: [
                {studentId: 1, studentMark: 10, presence: true, comment: null},
                {studentId: 3, studentMark: 11, presence: true, comment: null}
            ],
            mentorId: 1,
            studentGroupId: 1,
            themeName: "API testing",
        },
        {
            id: 2,
            lessonDate: "2021-06-25T17:50:48",
            lessonVisits: [
                {studentId: 2, studentMark: null, presence: false, comment: null},
                {studentId: 4, studentMark: 8, presence: true, comment: null},
            ],
            mentorId: 2,
            studentGroupId: 2,
            themeName: "Junit",
        }
    ],
    studentLessons: [ // currentCostumer.id = 1, currentCostumer.role = 1
        {
            comment: null,
            id: 1,
            lessonDate: '2021-06-16T23:47:00',
            mark: 10,
            presence: true,
            studentGroupId: 1,
            themeName: 'API testing',
        }
    ]

};
