import React from 'react';
import { paths, useActions } from '@/shared';
import { Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddCourse } from '@/features';
import { debug } from 'webpack';


jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));
const historyMock = {
  push: jest.fn(),
  location: {},
  listen: jest.fn(),
  createHref: jest.fn(),
};

const useActionsFns = {
  addCourse: jest.fn(),
  dispatchAddAlert: jest.fn(),
};
useActions.mockReturnValue([
  useActionsFns.addCourse,
  useActionsFns.dispatchAddAlert,
]);
describe('Render of AddCourse', () => {
  let mockCreatedCourseSelector;
 

  beforeEach(() => {
    mockCreatedCourseSelector = {
      isLoading: false,
      loaded: true,
      error: '',
    };
    useSelector.mockReturnValueOnce(mockCreatedCourseSelector);
    
  });

  it('Should the component be rendered.', () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <AddCourse />
      </Router>
    );
    expect(getByTestId('addCourse')).toBeInTheDocument();
  });

  it('Should be redirected to path COURSES when cancelBtn is clicked.', () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <AddCourse />
      </Router>
    );
    const cancelBtn = getByTestId('cancelBtn');
    fireEvent.click(cancelBtn);
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.COURSES);
  });
  it('Should be redirected to path COURSES when saveBtn is clicked after filling input.', async () => {
    const { container } = render(
      <Router history={historyMock}>
        <AddCourse />
      </Router>
    );
    const courseNameInput = container.querySelector('#name');
    const saveBtn = container.querySelector('#addCourseSubmit');
    
    fireEvent.change(courseNameInput, { target: { value: 'New Course' } });
 
    fireEvent.click(saveBtn);
 
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.COURSES);
  });
  it('submit Form', async () => {
    const { container} = render(
      <Router history={historyMock}>
        <AddCourse />
      </Router>
    );

    const onSubmit = jest.fn();
    const courseNameInput = container.querySelector('#name');
    const saveBtn = container.querySelector('#addCourseSubmit');

    await waitFor(() => {
      fireEvent.change(courseNameInput, { target: { value: 'New Course' } });
    });
    
    await waitFor(() => {
      fireEvent.click(saveBtn);
      onSubmit();
    });

    expect(onSubmit).toHaveBeenCalled();
    expect(useActionsFns.addCourse).toHaveBeenCalledTimes(2);
  });
 
});
