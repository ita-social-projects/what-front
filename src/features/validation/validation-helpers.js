import * as Yup from 'yup';

export const authValidation = Yup.object().shape({
  email: Yup.string()
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
});

export const registrationValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ -]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ \'-]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid last name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters')
    .required('This field is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'You should confirm your password')
    .required('This field is required'),
});

export const addCourseValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9.#/]([ &_-]|, |: )?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid course name')
    .max(50, 'Too long')
    .required('This field is required'),
});

export const editCourseValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9.#/]([ &_-]|, |: )?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid course name')
    .max(50, 'Too long')
    .required('This field is required'),
});

export const editGroupValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9][ _-]?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid group name')
    .max(50, 'Too long')
    .required('This field is required'),
  startDate: Yup.date()
    .required('This field is required'),
  finishDate: Yup.date()
    .min(Yup.ref('startDate'), 'Finish date can\'t be before start date')
    .required('This field is required'),
});

export const addLessonValidation = Yup.object().shape({
  themeName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9.#/][ &:_-]?|[, ]?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid theme name')
    .max(50, 'Too long')
    .required('This field is required'),
  groupName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9][ _-]?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid group name')
    .max(50, 'Too long')
    .required('This field is required'),
  lessonDate: Yup.string()
    .min(new Date(Date.now() - 86400000), 'The lesson cannot start in the past')
    .required('This field is required'),
  mentorEmail: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editSecretaryValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ -]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ \'-]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid last name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editMentorValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ -]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ \'-]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid last name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editStudentValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ -]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ][ \'-]?)+[A-Za-zА-Яа-яёЁ]+$', 'Invalid last name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});