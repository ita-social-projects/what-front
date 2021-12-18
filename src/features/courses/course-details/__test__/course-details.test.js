import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router, useHistory } from 'react-router-dom';

import { currentUserSelector } from '@/models';
import { homepages, paths } from '@/shared';
import { CourseDetails } from '../course-details';

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

describe('Render of CourseDetails', () => {
  let mockCoursesDetailsSelector;
  let ID;

  beforeEach(() => {
    mockCoursesDetailsSelector = {
      data: [],
      isLoading: false,
      loaded: true,
      error: '',
      currentUser: { role: 4 },
    };

    ID = 1;

    useSelector.mockReturnValueOnce(mockCoursesDetailsSelector);
  });

  it('Should the component be rendered.', () => {
    const { container } = render(
      <BrowserRouter>
        <CourseDetails id={ID} coursesData={mockCoursesDetailsSelector} />
      </BrowserRouter>
    );

    const courseDetailsContainer =
      container.getElementsByClassName('container');

    expect(courseDetailsContainer).toMatchSnapshot();
  });

  it('Should the user navigates to page by role.', () => {
    const history = useHistory();
    const { currentUser } = useSelector(currentUserSelector);

    render(
      <BrowserRouter>
        <CourseDetails id={ID} coursesData={mockCoursesDetailsSelector} />
      </BrowserRouter>
    );

    history.push(homepages[currentUser.role]);

    expect(history.push).toHaveBeenCalledWith(homepages[currentUser.role]);
  });

  it('Should the current user does not exist.', async () => {
    const history = createMemoryHistory();

    useSelector.mockReturnValue({
      currentUser: null,
    });

    render(
      <Router history={history}>
        <CourseDetails id={ID} coursesData={mockCoursesDetailsSelector} />
      </Router>
    );

    history.push(paths.NOT_FOUND);

    expect(history.location.pathname).toBe(paths.NOT_FOUND);
  });

  it('Should redirect to 404 page in case of error in course details data.', () => {
    const history = createMemoryHistory();

    useSelector.mockReturnValue({
      ...mockCoursesDetailsSelector,
      error: 'Something went wrong',
      loaded: false,
    });

    render(
      <Router history={history}>
        <CourseDetails id={ID} coursesData={mockCoursesDetailsSelector} />
      </Router>
    );

    history.push(paths.NOT_FOUND);

    expect(history.location.pathname).toBe(paths.NOT_FOUND);
  });
});
