import {lessonsDataMock} from './lessons-mock-data';

export const lessonsSelectorsMock = {
    allLessons: {
        data: lessonsDataMock.lessons,
        isLoading: false,
        isLoaded: true,
        error: '',
    },
    studentLessons: {
        data: lessonsDataMock.studentLessons,
        isLoading: false,
        isLoaded: true,
        error: '',
    },
    lessonById: { // can't use it, because of mistake in fetch response (lesson.theme === null)
        // data: {},
        // isLoading: false,
        // isLoaded: false,
        // error: '',
    },
    addLesson: {
        isLoading: false,
        isLoaded: false,
        error: '',
    },
    editLesson: {
        isLoading: false,
        isLoaded: false,
        error: '',
    },

};
