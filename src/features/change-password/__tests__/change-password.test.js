import React from 'react';
import { useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChangePassword } from '../change-password';
import { useActions, paths } from '@/shared/index.js';
import { newPassword } from '@models/index.js';
import { addAlert } from '@/features';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    isLoading: false,
    error: '',
    loaded: true,
  }),
}));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn().mockReturnValue([jest.fn(), jest.fn()]),
}));

describe('Change password', () => {
  let formValues;
  beforeEach(() => {
    formValues = {
      email: 'testmail@gmail.com',
      currentPassword: 'OldTestpassw!ord123',
      newPassword: 'Testpassw!ord123',
      confirmNewPassword: 'Testpassw!ord123',
    };
  });

  it('should render component', () => {
    const { container } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    const changePasswordContainer = container.getElementsByClassName(
      'container'
    );

    expect(changePasswordContainer).toMatchSnapshot();
  });

  it('should validate the form', async () => {
    const { getByText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );

    const submitButton = getByText('Save');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
  });

  it('current user does not exist', async () => {
    const history = createMemoryHistory();

    useSelector.mockReturnValue({
      currentUser: null,
    });

    render(
      <Router history={history}>
        <ChangePassword />
      </Router>
    );

    history.push(paths.NOT_FOUND);

    expect(history.location.pathname).toBe(paths.NOT_FOUND);
  });

  it('should handle cancel action', async () => {
    const history = createMemoryHistory();
    const INITIAL_PATH = '/';

    const { getByText } = render(
      <Router history={history}>
        <ChangePassword />
      </Router>
    );

    const cancelButton = getByText('Cancel');

    await waitFor(() => {
      fireEvent.click(cancelButton);
    });

    expect(history.location.pathname).toBe(INITIAL_PATH);
  });

  it('should handle error receiving', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      loaded: true,
    });

    render(
      <Router>
        <ChangePassword />
      </Router>
    );

    const [_, dispatchAddAlert] = useActions([newPassword, addAlert]);

    expect(dispatchAddAlert).toHaveBeenCalled();
  });

  it('should submit the form with correct schema', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );

    const email = getByPlaceholderText('Email address');
    const currentPassword = getByPlaceholderText('Current password');
    const password = getByPlaceholderText('New password');
    const confirmNewPassword = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Save');

    const [setNewPassword, _] = useActions(newPassword, addAlert);

    fireEvent.change(email, {
      target: {
        value: formValues.email,
      },
    });

    fireEvent.change(currentPassword, {
      target: {
        value: formValues.currentPassword,
      },
    });

    fireEvent.change(password, {
      target: {
        value: formValues.newPassword,
      },
    });

    fireEvent.change(confirmNewPassword, {
      target: {
        value: formValues.confirmNewPassword,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    setNewPassword({
      email: email.value,
      currentPassword: currentPassword.value,
      newPassword: password.value,
      confirmNewPassword: confirmNewPassword.value,
    });

    expect(setNewPassword).toHaveBeenCalledWith(formValues);
  });
});
