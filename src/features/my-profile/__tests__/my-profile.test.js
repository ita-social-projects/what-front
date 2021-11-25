import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import { MyProfile } from '../my-profile';
import { paths } from '@/shared';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    currentUser: jest.fn().mockReturnValue({
      firstName: 'User',
      lastName: 'User',
      email: 'test.u@gmail.com',
    }),
  }),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('My Profile', () => {
  it('should render component', () => {
    const { container } = render(
      <Router>
        <MyProfile />
      </Router>
    );
    const profileContainer = container.getElementsByClassName('container');

    expect(profileContainer).toMatchSnapshot();
  });

  it('should navigate to change password page', async () => {
    const history = useHistory();

    const { getByRole } = render(
      <Router>
        <MyProfile />
      </Router>
    );

    const changePasswordButton = getByRole('button');

    await waitFor(() => {
      fireEvent.click(changePasswordButton);
    });

    expect(history.push).toHaveBeenCalledWith(paths.CHANGE_PASSWORD);
  });
});
