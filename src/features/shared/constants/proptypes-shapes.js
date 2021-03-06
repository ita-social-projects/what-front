import {
  shape, arrayOf, object, oneOfType, number, string, bool,
} from 'prop-types';

export const studentGroupShape = {
  id: number.isRequired,
  courseId: number.isRequired,
  name: string.isRequired,
  startDate: string.isRequired,
  finishDate: string.isRequired,
  studentIds: arrayOf(number).isRequired,
  mentorIds: arrayOf(number).isRequired,
};

export const studentShape = {
  id: number.isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
};

export const mentorShape = {
  id: number.isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
};

export const courseShape = {
  id: number.isRequired,
  name: string.isRequired,
};

export const studentsStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  isLoaded: bool.isRequired,
  data: oneOfType([arrayOf(shape(studentShape)), arrayOf(undefined)]).isRequired,
};

export const mentorsStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  isLoaded: bool.isRequired,
  data: oneOfType([arrayOf(shape(mentorShape)), arrayOf(undefined)]).isRequired,
};

export const coursesStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  loaded: bool.isRequired,
  data: oneOfType([arrayOf(shape(courseShape)), arrayOf(undefined)]).isRequired,
};

export const studentGroupsStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  isLoaded: bool.isRequired,
  data: oneOfType([arrayOf(shape(studentGroupShape)), arrayOf(undefined)]).isRequired,
};

export const studentGroupByIdStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  isLoaded: bool.isRequired,
  data: oneOfType([shape(studentGroupShape), object]).isRequired,
};

export const scheduleShape = {
  id: number.isRequired,
  studentGroupId: number.isRequired,
  lessonStart: string.isRequired,
  lessonEnd: string.isRequired,
  repeatRate: number.isRequired,
  dayNumber: number.isRequired,
};

export const scheduleStateShape = {
  error: string.isRequired,
  isLoading: bool.isRequired,
  isLoaded: bool.isRequired,
  data: oneOfType([arrayOf(shape(scheduleShape)), arrayOf(undefined)]).isRequired,
};
