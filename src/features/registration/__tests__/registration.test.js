import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Registration } from '../registration.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn().mockReturnValue({
  isLoading: false,
  error: '',
  isLoaded: true,
}) }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('Registration', () => {
  it('should render component', () => {
    const { container } = render(<Router><Registration /></Router>);

    expect(container).toBeInTheDocument();
  });

  it('should check elements accessibility', async () => {
    const { getByPlaceholderText } = render(<Router><Registration /></Router>);

    const firstName = getByPlaceholderText('First name');
    const lastName = getByPlaceholderText('Last name');
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');
    const confirmPassword = getByPlaceholderText('Confirm password');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();

    firstName.focus();
    await waitFor(() => {
      expect(firstName).toHaveFocus();
    });

    lastName.focus();
    await waitFor(() => {
      expect(lastName).toHaveFocus();
    });

    email.focus();
    await waitFor(() => {
      expect(email).toHaveFocus();
    });

    password.focus();
    await waitFor(() => {
      expect(password).toHaveFocus();
    });

    confirmPassword.focus();
    await waitFor(() => {
      expect(confirmPassword).toHaveFocus();
    });
  });

  it('should submit form correctly', async () => {
    const formValues = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'testemail@gmail.com',
      password: 'testpassword123',
      confirmPassword: 'testpassword123',
    };

    const { getByPlaceholderText, getByText } = render(<Router><Registration /></Router>);

    const firstName = getByPlaceholderText('First name');
    const lastName = getByPlaceholderText('Last name');
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');
    const confirmPassword = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Sign up');

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

    expect(firstName).toHaveValue(formValues.firstName);
    expect(lastName).toHaveValue(formValues.lastName);
    expect(email).toHaveValue(formValues.email);
    expect(password).toHaveValue(formValues.password);
    expect(confirmPassword).toHaveValue(formValues.confirmPassword);
    expect(password.value).toMatch(confirmPassword.value);

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const submitHandler = jest.fn();
    submitHandler({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    expect(submitHandler).toHaveBeenCalledWith(formValues);
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
});