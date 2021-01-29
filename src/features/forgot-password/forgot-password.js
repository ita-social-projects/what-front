import React from 'react';
import { useActions } from '@/shared';
import { forgotPassword } from '@/models';

import { Button } from '@/components';

import { Formik, Form, Field } from 'formik';

export const ForgotPassword = () => {
  // const [setforgotPassword] = useActions([forgotPassword]);

  const onSubmit = (value) => {
    value.formUrl = 'test.com';
    console.log(value);
    // setforgotPassword(value);
  };

  return (
    <div className="container card shadow">
      <Formik
        initialValues={{
          email: '',
        }}
      // validationSchema={changePasswordValidation}
        onSubmit={onSubmit}
      >
        <Form>
          <label htmlFor="email" className="font-weight-bold">Email address:</label>
          <Field
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Enter email"
          />
          <Button
            type="submit"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
