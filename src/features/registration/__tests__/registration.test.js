import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { useActions } from '@/shared/index.js';
import { registration } from '@models/index.js';
import { Registration } from '../registration.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn().mockReturnValue({
  isLoading: false,
  error: '',
  isLoaded: true,
}) }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn().mockReturnValue(jest.fn()) }));

describe('Registration', () => {
  let formValues;
  beforeEach(() => {
    formValues = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'testemail@gmail.com',
      password: 'Testpassw!ord123',
      confirmPassword: 'Testpassw!ord123',
    };
  });

  it('should render component', () => {
    const { container } = render(<Router><Registration /></Router>);
    const formContainer = container.getElementsByClassName('container');

    expect(formContainer).toMatchSnapshot();
  });

  it('should validate the form', async () => {
    const {
      getByText,
      getAllByText,
    } = render(<Router><Registration /></Router>);

    const FORM_FIELDS_AMOUNT = 5;
    const submitButton = getByText('Sign up');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const errors = getAllByText('This field is required');

    expect(errors).toHaveLength(FORM_FIELDS_AMOUNT);
    expect(errors).toMatchSnapshot();
  });

  it('should handle error receiving', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      isLoaded: true,
    });

    const { getByText } = render(<Router><Registration /></Router>);

    const error = getByText('Something went wrong');
    expect(error).toBeInTheDocument();
  });

  it('should submit the form with correct schema', async () => {
    const { getByPlaceholderText, getByText } = render(<Router><Registration /></Router>);

    const firstName = getByPlaceholderText('First name');
    const lastName = getByPlaceholderText('Last name');
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');
    const confirmPassword = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Sign up');

    const signUp = useActions(registration);

    fireEvent.change(firstName, {
      target: {
        value: formValues.firstName,
      },
    });

    fireEvent.change(lastName, {
      target: {
        value: formValues.lastName,
      },
    });

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

    fireEvent.change(confirmPassword, {
      target: {
        value: formValues.confirmPassword,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    signUp({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    expect(signUp).toHaveBeenCalledWith(formValues);
  });
});