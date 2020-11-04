import {useState, useEffect} from 'react';


export const useForm = (callback, validate) => {
  const [values, setValues] = useState({email: '', password: '', remember: false});
  const [errors, setErrors] = useState({email: '', password: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeInput = (event) => {
    const {name, value} = event.target
    setValues({
      ...values,
      [name]: value
    });
    setErrors(validate(values));
  }

  const handleRememberMe = (event) => {
    const {name, checked} = event.target;
    setValues({
      ...values,
      [name]: checked
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  return {
    handleChangeInput,
    handleRememberMe,
    handleSubmit,
    values,
    errors,
  }
}