import { oneOf } from 'prop-types';
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
    .max(50, 'Too long')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .max(16, 'Password must contain 16 characters maximum')
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+=-]).*$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special symbol (!@#$%^&*()_+-=)',
    )
    .required('This field is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'You should confirm your password')
    .required('This field is required'),
});

export const addCourseValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^([a-zA-Z0-9.#+/]([ &_-]|, |: )?)+[a-zA-Z0-9]+$', 'Invalid course name')
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
    .min(1, 'Too short')
    .max(100, 'Too long')
    .matches('^[a-zA-Zа-яА-ЯЇїІіЄєҐґ0-9.][a-zA-Zа-яА-ЯЇїІіЄєҐґ 0-9#+]*$', 'Invalid lesson theme')
    .required('This field is required'),
  lessonDate: Yup.string()
    .max(new Date(), 'The lesson cannot start in the future')
    .required('This field is required'),
});

export const editLessonValidation = Yup.object().shape({
  themeName: Yup.string()
    .min(1, 'Too short')
    .max(100, 'Too long')
    .matches('^[a-zA-Zа-яА-ЯЇїІіЄєҐґ0-9][a-zA-Zа-яА-ЯЇїІіЄєҐґ 0-9]*$', 'Invalid lesson theme')
    .required('This field is required'),
  lessonDate: Yup.string()
    .max(new Date(), 'The lesson cannot start in the future')
    .required('This field is required'),
  groupName: Yup.string()
      .min(1, 'Too short')
      .matches('^([A-Za-zА-Яа-яёЁ0-9][ _-]?)+([ _-]+[0-9]+[\/ _-]?[0-9]+)?$', 'Invalid group name')
      .max(100, 'Too long')
      .required('This field is required'),
  formData: Yup.array().of(
      Yup.object({
        studentId: Yup.number().moreThan(0).required(),
        studentMark: Yup.number().nullable(),
        presence: Yup.boolean().default(false).required(),
        comment: Yup.string().default(''),
      })),
});

export const lessonValidation = Yup.object().shape({
  themeName: Yup.string()
    .min(1, 'Too short')
    .max(100, 'Too long')
    .required('This field is required'),
  groupName: Yup.string()
    .min(1, 'Too short')
    .matches('^([A-Za-zА-Яа-яёЁ0-9][ _-]?)+[A-Za-zА-Яа-яёЁ0-9]+$', 'Invalid group name')
    .max(50, 'Too long')
    .required('This field is required'),
  lessonDate: Yup.string()
    .max(new Date(), 'The lesson cannot start in the future')
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
    .max(50, 'Too long')
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
    .max(50, 'Too long')
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
    .max(50, 'Too long')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const changePasswordValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .required('This field is required'),
  newPassword: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_%^&+=]).*$/,
//      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Must contain at least one uppercase, one lowercase, one number',
    )
    .notOneOf([Yup.ref('currentPassword'), null], 'You should provide a new password')
    .required('This field is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'You should confirm your password')
    .required('This field is required'),
});

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const resetPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  newPassword: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Must contain at least one uppercase, one lowercase, one number',
    )
    .notOneOf([Yup.ref('currentPassword'), null], 'You should provide a new password')
    .required('This field is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'You should confirm your password')
    .required('This field is required'),
});

export const addScheduleValidation = Yup.object().shape({
  patternType: Yup.string()
    .required('This field is required'),

  interval: Yup.string()
    .required('This field is required'),

  daysOfWeek: Yup.array().when('patternType', {
    is: (val) => /week/g.test(val),
    then: Yup.array().of(Yup.string()).min(1, 'Should be choosen at least one day'),
  }),

  dates: Yup.string().when('patternType', {
    is: (val) => val === 'on the same day of the month',
    then: Yup.string().required('This field is required'),
  }),

  index: Yup.string().when('patternType', {
    is: (val) => /example/g.test(val),
    then: Yup.string().required('This field is required'),
  }),

  startDate: Yup.date()
    .min(new Date(), 'Schedule`s start date can`t be in the past')
    .required('This field is required'),

  finishDate: Yup.date()
    .min(Yup.ref('startDate'), 'Schedule`s finish date can`t be earlier start date')
    .required('This field is required'),

  group: Yup.string()
    .required('This field is required'),

  theme: Yup.string()
    .required('This field is required'),

  mentor: Yup.string()
    .required('This field is required'),
});