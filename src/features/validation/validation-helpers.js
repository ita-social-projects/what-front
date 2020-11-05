export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = 'Invalid email address.';
  }
  
  return error;
}

export const validatePassword = value => {
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
  if(!value) {
    error = 'You should confirm your password.';
  } else if(pass && value) {
    if(pass !== value) {
      error = 'Password do not match.';
    }
  }
  return error;
};