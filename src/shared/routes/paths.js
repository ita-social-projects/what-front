export const HOME = '/';
export const AUTH = '/auth';
export const REGISTRATION = '/registration';
export const COUNTER = '/counter';
export const NOT_FOUND = '/404';

export const STUDENTS = '/students';
export const STUDENTS_DETAILS = (id = ':id') => `/students/${id}`;
export const STUDENT_EDIT = (id = ':id') => `/students/edit/${id}`;
export const STUDENT_ADD = '/students/add';

export const COURSES = '/courses';
export const COURSE_DETAILS = (id = ':id') => `/courses/${id}`;
export const COURSE_EDIT = (id = ':id') => `/courses/edit-course/${id}`;
export const COURSE_ADD = '/courses/add';

export const GROUPS = '/groups';
export const GROUPS_DETAILS = (id = ':id') => `/groups/${id}`;
export const GROUP_EDIT = (id = ':id') => `/groups/edit/${id}`;
export const GROUP_ADD = '/groups/add';

export const MENTORS = '/mentors';
export const MENTORS_DETAILS = (id = ':id') => `/mentors/${id}`;
export const MENTOR_EDIT = (id = ':id') => `/mentors/edit/${id}`;
export const MENTOR_ADD = '/mentors/add';

export const SECRETARIES = '/secretaries';
export const SECRETARIES_DETAILS = (id = ':id') => `/secretaries/${id}`;
export const SECRETARY_EDIT = (id = ':id') => `/secretaries/edit/${id}`;
export const SECRETARY_ADD = '/secretaries/add';

export const homepages = {
  0: HOME, // unassigned user
  1: HOME, // student homepage
  2: STUDENTS, // mentor homepage
  3: MENTORS, // secretary
  4: SECRETARIES, // admin homepage
};
