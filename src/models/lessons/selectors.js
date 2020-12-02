export const lessonsListSelector = (state) => state.models.lessons.data;

export const studentLessonsSelector = (state) => state.models.lessons.lessonsByStudent;

export const dataIsLoadingSelector = (state) => state.models.lessons.isLoading;
