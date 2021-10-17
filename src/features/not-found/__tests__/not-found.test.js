import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { NotFound } from '../not-found.js';
import { currentUserSelector } from '@/models';
import { homepages } from '@/shared';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    currentUser: jest.fn().mockReturnValue({
      role: 4,
    }),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('NotFound', () => {
  it('renders NotFound component', () => {
    const { container } = render(
      <Router>
        <NotFound />
      </Router>
    );
    const notFoundContainer = container.getElementsByClassName('container');

    expect(notFoundContainer).toMatchSnapshot();
  });

  it('user navigates to page by role', () => {
    const history = useHistory();
    const { currentUser } = useSelector(currentUserSelector);

    render(
      <Router>
        <NotFound />
      </Router>
    );

    history.push(homepages[currentUser.role]);
    expect(history.push).toHaveBeenCalledWith(homepages[currentUser.role]);
  });
});
