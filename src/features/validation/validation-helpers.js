import * as Yup from 'yup';

export const authValidation = Yup.object().shape({
  email: Yup.string()
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
});

export const registrationValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+-?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid second name')
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
    .matches('^[A-Za-zа-яА-ЯёЁ]+[:-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid course name')
    .max(50, 'Too long')
    .required('This field is required'),
});

export const editCourseValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+[:-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid course name')
    .max(50, 'Too long')
    .required('This field is required'),
});

export const editGroupValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+[:-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid course name')
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
    .matches('^[A-Za-zа-яА-ЯёЁ]+[:-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid theme name')
    .max(50, 'Too long')
    .required('This field is required'),
  groupName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+[:-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid group name')
    .max(50, 'Too long')
    .required('This field is required'),
  lessonDate: Yup.string()
    .required('This field is required'),
  mentorEmail: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editSecretaryValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+-?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid second name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editMentorValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+-?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid second name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const editStudentValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+-?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid second name')
    .max(50, 'Too longs')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const formValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+$', 'Invalid first name')
    .max(50, 'Too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+-?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid second name')
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
  date: Yup.string()
    .matches('^([0-3][0-9]).([0][1-9]|[1][0-2]).([12][0-9]{3})$', 'Invalid date')
    .required('This field is required'),
  name: Yup.string()
    .min(2, 'Too short')
    .matches('^[A-Za-zа-яА-ЯёЁ]+[-_ ]?[A-Za-zа-яА-ЯёЁ]+$', 'Invalid course name')
    .max(50, 'Too long')
    .required('This field is required'),
});

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = 'Invalid email address.';
  }

  return error;
};

export const validatePassword = (value) => {
  let error;
  const passwordRegex = /(?=.*[0-9])/;
  if (!value) {
    error = 'Password is required.';
  } else if (value.length < 8) {
    error = 'Password must be 8 characters long.';
  } else if (!passwordRegex.test(value)) {
    error = 'Invalid password. Must contain one number.';
  }
  return error;
};

export const validateConfirmPassword = (pass, value) => {
  let error;
  if (!value) {
    error = 'You should confirm your password.';
  } else if (pass && value) {
    if (pass !== value) {
      error = 'Password do not match.';
    }
  }
  return error;
};

export const validateGroupName = (value) => {
  let error;
  const groupName = /^[a-zа-яёА-ЯЁA-Z]+(?:\s*[a-zа-яёА-ЯЁA-Z0-9-_\.]){1,20}$/;
  if (!value) {
    error = 'This field is required';
  } else if (!groupName.test(value)) {
    error = 'Invalid group name';
  }
  return error;
};

export const validateDate = (start, finish) => {
  let error;
  const startDate = Date.parse(start);
  const finishDate = Date.parse(finish);
  if (finishDate < startDate || finishDate === startDate) {
    error = 'Invalid date';
  }
  return error;
};

export const validateName = (value) => {
  let error;
  const name = /[a-zA-Zа-яА-Я0-9]+/;
  if (!value) {
    error = 'This field is required';
  } else if (!name.test(value)) {
    error = 'Invalid mentor name';
  }
  return error;
};

export const authValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});
