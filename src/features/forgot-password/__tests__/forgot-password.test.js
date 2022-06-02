import React from 'react';
import { useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useActions } from '@/shared/index.js';
import { forgotPassword } from '@models/index.js';
import { ForgotPassword } from '../forgot-password.js';

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

describe('Forgot password', () => {
  let formValues;
  beforeEach(() => {
    formValues = {
      email: 'testmail@gmail.com',
    };
  });

  it('should render component', () => {
    const { container } = render(
      <Router>
        <ForgotPassword />
      </Router>
    );
    const forgotPasswordContainer = container.getElementsByClassName(
      'container'
    );

    expect(forgotPasswordContainer).toMatchSnapshot();
  });

  it('button should be disabled', async () => {
    const { getByText } = render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const submitButton = getByText('Send');

    expect(submitButton).toBeDisabled();
  });

  it('should handle error receiving', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      loaded: true,
    });

    const { getByText } = render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const error = getByText('Something went wrong');
    expect(error).toBeInTheDocument();
  });

  it('should submit the form with correct schema', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const email = getByPlaceholderText('Email address');
    const submitButton = getByText('Send');

    const [setForgotPassword] = useActions(forgotPassword);

    fireEvent.change(email, {
      target: {
        value: formValues.email,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    setForgotPassword({
      email: email.value,
    });

    expect(setForgotPassword).toHaveBeenCalledWith(formValues);
  });
});
