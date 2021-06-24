import React from 'react';
import { paths, useActions } from '@/shared';
import { Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddCourse } from '@/features';

// import {useState, useStateMock} from './mocks/mock-useState';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('Render of AddCourse', () => {
  let historyMock;
  let mockCreatedCourseSelector;
  let useActionsFns;
  beforeEach(() => {
    mockCreatedCourseSelector = {
      isLoading: false,
      loaded: false,
      error: '',
    };

    useSelector.mockReturnValueOnce(mockCreatedCourseSelector);

    useActionsFns = {
      addCourse: jest.fn(),
      dispatchAddAlert: jest.fn(),
    };
    useActions.mockReturnValue([
      useActionsFns.addCourse,
      useActionsFns.dispatchAddAlert,
    ]);

    historyMock = {
      push: jest.fn(),
      location: {},
      listen: jest.fn(),
      createHref: jest.fn(),
    };
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
  it('Should be redirected to path COURSES when saveBtn is clicked after filling input.', () => {
    const { container } = render(
      <Router history={historyMock}>
        <AddCourse />
      </Router>
    );
    const courseNameInput = container.querySelector('.form-control');
    const saveBtn = container.querySelector('.w-25');
    courseNameInput.value = 'Test';
    fireEvent.click(saveBtn);
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.COURSES);
  });
});
