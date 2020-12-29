import * as Yup from 'yup';

export const changePasswordValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Password has to be longer than 6 characters')
    .required('This field is required'),
  newPassword: Yup.string()
    .min(6, 'Password has to be longer than 6 characters')
    .notOneOf([Yup.ref('currentPassword'), null], 'You should provide a new password')
    .required('This field is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'You should confirm your password')
    .required('This field is required'),
});

export const formValidate = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      '^[A-Za-zа-яА-ЯёЁ]+$',
      'Invalid first name',
    )
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      '^[A-Za-zа-яА-ЯёЁ]+$',
      'Invalid second name',
    )
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid Email')
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
