export const paths = {
  HOME: '/',
  AUTH: '/auth',
  REGISTRATION: '/registration',
  COUNTER: '/counter',
  NOT_FOUND: '/404',

  STUDENTS: '/students',
  STUDENTS_DETAILS: '/students',
  STUDENT_EDIT: '/students/edit',
  STUDENT_ADD: '/students/add',

  COURSES: '/courses',
  COURSE_DETAILS: '/courses',
  COURSE_EDIT: '/courses/edit-course',
  COURSE_ADD: '/courses/add',

  GROUPS: '/groups',
  GROUPS_DETAILS: '/groups',
  GROUP_EDIT: '/groups/edit',
  GROUP_ADD: '/groups/add',

  MENTORS: '/mentors',
  MENTORS_DETAILS: '/mentors',
  MENTOR_EDIT: '/mentors/edit',
  MENTOR_ADD: '/mentors/add',

  SECRETARIES: '/secretaries',
  SECRETARIES_DETAILS: '/secretaries',
  SECRETARY_EDIT: '/secretaries/edit',
  SECRETARY_ADD: '/secretaries/add',

  LESSONS: '/lessons',
  LESSON: '/lessons',
  LESSON_ADD: '/lessons/add',
  LESSON_EDIT: '/lessons/edit',

  UNASSIGNED_USERS: '/unassigned',
};

export const homepages = {
  0: paths.HOME, // unassigned user
  1: paths.HOME, // student homepage
  2: paths.STUDENTS, // mentor homepage
  3: paths.MENTORS, // secretary
  4: paths.STUDENTS, // admin homepage
};
