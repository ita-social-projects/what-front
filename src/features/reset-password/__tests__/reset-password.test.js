import React from 'react';
import { useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useActions } from '@/shared/index.js';
import { resetPassword } from '@models/index.js';
import { ResetPassword } from '../reset-password';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    isLoading: false,
    error: '',
    loaded: true,
  }),
}));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn().mockReturnValue([jest.fn()]),
}));

describe('Reset password', () => {
  let formValues;
  beforeEach(() => {
    formValues = {
      email: 'testmail@gmail.com',
      newPassword: 'Testpassw!ord123',
      confirmPassword: 'Testpassw!ord123',
    };
  });

  it('should render component', () => {
    const { container } = render(
      <Router>
        <ResetPassword />
      </Router>
    );
    const resetPasswordContainer = container.getElementsByClassName(
      'container'
    );

    expect(resetPasswordContainer).toMatchSnapshot();
  });

  it('should validate the form', async () => {
    const { getByText } = render(
      <Router>
        <ResetPassword />
      </Router>
    );

    const submitButton = getByText('Confirm');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const error = getByText(
      'Fill the form to create a new password for your account'
    );

    expect(error).toBeInTheDocument();
  });

  it('should handle error receiving', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      loaded: true,
    });

    const { getByText } = render(
      <Router>
        <ResetPassword />
      </Router>
    );

    const error = getByText('Something went wrong');
    expect(error).toBeInTheDocument();
  });

  it('should submit the form with correct schema', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <ResetPassword />
      </Router>
    );

    const email = getByPlaceholderText('Email address');
    const newPassword = getByPlaceholderText('New password');
    const confirmPassword = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Confirm');

    const [setResetPassword] = useActions(resetPassword);

    fireEvent.change(email, {
      target: {
        value: formValues.email,
      },
    });

    fireEvent.change(newPassword, {
      target: {
        value: formValues.newPassword,
      },
    });

    fireEvent.change(confirmPassword, {
      target: {
        value: formValues.confirmPassword,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    setResetPassword({
      email: email.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });

    expect(setResetPassword).toHaveBeenCalledWith(formValues);
  });
});
