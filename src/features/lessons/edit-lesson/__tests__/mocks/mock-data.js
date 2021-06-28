const groupData =
    {
        courseId: 9,
        finishDate: "2022-06-17T00:00:00",
        id: 1,
        mentorIds: [1],
        name: "122-18-3",
        startDate: "2021-05-17T00:00:00",
        studentIds: [1, 3]
    };


export const mockGroupSelector = {
    data: groupData,
    isLoading: false,
    isLoaded: true,
    error: '',
};

const studentsData = [
    {
        avatarUrl: null,
        email: "student@gmail.com",
        firstName: "student",
        id: 1,
        lastName: "student",
    },
    {
        avatarUrl: null,
        email: "StudenT01@gmail.com",
        firstName: "StudenT",
        id: 3,
        lastName: "StudenT",
    }
];

export const mockStudentsSelector = {
    data: studentsData,
    isLoading: false,
    isLoaded: true,
    error: '',
};
export const mockLessonOnEdit =
    {
        id: 1,
        themeName: "API testing",
        mentorId: 1,
        studentGroupId: 1,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits:
            [
                {studentId: 1, studentMark: 10, presence: true, comment: "", studentName: "student student"},
                {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };

export const newPresenceStatusLessonOnEdit =
    {
        id: 1,
        themeName: "API testing",
        mentorId: 1,
        studentGroupId: 1,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits:
            [
                {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "student student"},
                {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };

export const newMarkLessonOnEdit =
    {
        id: 1,
        themeName: "API testing",
        mentorId: 1,
        studentGroupId: 1,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits:
            [
                {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "student student"},
                {studentId: 3, studentMark: 12, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };

export const newMarkMore12LessonOnEdit =
    {
        id: 1,
        themeName: "API testing",
        mentorId: 1,
        studentGroupId: 1,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits:
            [
                {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "student student"},
                {studentId: 3, studentMark: 0, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };

export const submitValues = {
    themeName: "API testing",
    groupName: '122-18-3',
    lessonDate: '2021-06-17T02:47',
    formData: [{
        studentId: 1, studentMark: '', presence: false, comment: "", studentName: "student student"
    }, {studentId: 3, studentMark: 12, presence: true, comment: "", studentName: "StudenT StudenT"}],
};

export const noLessonData = [
    {
        id: 3,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits: [
            {studentId: 5, studentMark: 10, presence: true, comment: null},
            {studentId: 6, studentMark: 11, presence: true, comment: null}
        ],
        mentorId: 9,
        studentGroupId: 1,
        themeName: "123123123API testing",
    }
];
