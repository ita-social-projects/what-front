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
  COURSE_EDIT: '/courses/edit',
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
  LESSON_ADD: '/lessons/add',
  LESSON_DETAILS: '/lessons',
  LESSON_EDIT: '/lessons/edit',
  
  THEMES_DOWNLOAD: '/imports/themes',
  
  SCHEDULE: '/schedule',
  SCHEDULE_EDIT: '/schedule/edit',
  SCHEDULE_ADD: '/schedule/add',

  UNASSIGNED_USERS: '/unassigned',
  MY_PROFILE: '/my-profile',
  CHANGE_PASSWORD: '/change-password',
  SUPPORT: '/support',
};

export const homepages = {
  1: paths.SCHEDULE, // student homepage
  2: paths.LESSONS, // mentor homepage
  3: paths.MENTORS, // secretary
  4: paths.STUDENTS, // admin homepage
};
