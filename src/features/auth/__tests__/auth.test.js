import React from 'react';
import { useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useActions } from '@/shared/index.js';
import { login } from '@models/index.js';
import { Auth } from '../auth.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn().mockReturnValue({
  isLoading: false,
  error: '',
  loaded: true,
}) }));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Auth', () => {
  let formValues;
  beforeEach(() => {
    formValues = {
      email: 'testmail@gmail.com',
      password: 'Testpassw!ord123',
    };
  });

  it('should render component', () => {
    const { container } = render(<Router><Auth /></Router>);
    const authContainer = container.getElementsByClassName('container');

    expect(authContainer).toMatchSnapshot();
  });

  it('should validate the form', async () => {
    const { getByText, getAllByText } = render(<Router><Auth /></Router>);

    const FORM_FIELD_AMOUNT = 2;
    const submitButton = getByText('Sign in');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const errors = getAllByText('This field is required');

    expect(errors).toHaveLength(FORM_FIELD_AMOUNT);
    expect(errors).toMatchSnapshot();
  });

  it('should handle error receiving', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      loaded: true,
    });

    const { getByText } = render(<Router><Auth /></Router>);

    const error = getByText('Something went wrong');
    expect(error).toBeInTheDocument();
  });

  it('should submit the form with correct schema', async () => {
    const { getByPlaceholderText, getByText } = render(<Router><Auth /></Router>);

    const email = getByPlaceholderText('Email address');
    const password = getByPlaceholderText('Password');
    const submitButton = getByText('Sign in');

    const signIn = useActions(login);

    fireEvent.change(email, {
      target: {
        value: formValues.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: formValues.password,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    signIn({
      email: email.value,
      password: password.value,
    });

    expect(signIn).toHaveBeenCalledWith(formValues);
  });
});