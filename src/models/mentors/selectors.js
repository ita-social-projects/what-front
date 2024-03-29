export const mentorsSelector = (state) => state.models.mentors.mentors;
export const mentorsActiveSelector = (state) => state.models.mentors.mentorsActive;
export const mentorIdSelector = (state) => state.models.mentors.mentorById;
export const mentorGroupsSelector = (state) => state.models.mentors.mentorByIdGroups;
export const mentorCoursesSelector = (state) => state.models.mentors.mentorByIdCourses;
export const mentorLessonsSelector = (state) => state.models.mentors.mentorByIdLessosns;
export const mentorFiltredLessonsSelector = (state) => state.models.mentors.mentorsFiltredLessons;
export const mentorEditingSelector = (state) => state.models.mentors.mentorEditing;
export const mentorAddingSelector = (state) => state.models.mentors.mentorAdding;
export const mentorDeletingSelector = (state) => state.models.mentors.mentorDeleting;
export const mentorReactivatingSelector = (state) => state.models.mentors.mentorReactivating;