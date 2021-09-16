import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { useSelector } from 'react-redux';
import {createMemoryHistory} from 'history'

import {
  mockCurrentStudentSelector,
  mockLoadStudentsGroupSelector,
  mockCurrentStudentGroupsSelector,
  mockEditStudentSelector,
  mockRemoveStudentSelector,
} from './mock-data.js';

import { useStates, useStateMock } from './mock-state.js';

import { EditStudentsDetails } from '../edit-students-details.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('edit-student-details component', () => {
  let id;
  let historyMock;
  let useActionsFns;

  const doBefor = () => {
    useSelector
      .mockReturnValue(mockCurrentStudentSelector)
      .mockReturnValue(mockLoadStudentsGroupSelector)
      .mockReturnValue(mockCurrentStudentGroupsSelector);

    historyMock = {
      push: jest.fn(),
      location: {},
      listen: jest.fn(),
      createHref: jest.fn(),
    };

    useActionsFns = {
      updateStudent: jest.fn(),
      deleteStudent: jest.fn(),
      dispatchAddAlert: jest.fn(),
    };

    useActions.mockReturnValue(
      [
        useActionsFns.updateStudent,
        useActionsFns.deleteStudent,
        useActionsFns.dispatchAddAlert,
      ],
    );

    id = 1;
  };

  describe('test loader', () => {
    beforeEach(doBefor);

    it('should show loader while areStudentGroupsLoading is true', () => {
      const mockLocalCurrentStudentSelector = {
        ...mockCurrentStudentSelector,
        isLoading: true,
      };

      useSelector.mockReturnValueOnce(mockLocalCurrentStudentSelector);

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader while areGroupsLoading is true', () => {
      const mockAreGroupsLoading = {
        ...mockLoadStudentsGroupSelector,
        isLoading: true,
      };

      useSelector.mockReturnValueOnce(mockAreGroupsLoading);

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader while areGroupsLoading is true', () => {
      const mockLocalCurentStudentGroupsSelector = {
        ...mockCurrentStudentGroupsSelector,
        isLoading: true,
      };

      useSelector.mockReturnValueOnce(mockLocalCurentStudentGroupsSelector);

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  });

  describe('test content', () => {
    beforeEach(() => {
      mockCurrentStudentSelector.isLoading = false;
      mockCurrentStudentSelector.isLoaded = true;

      mockLoadStudentsGroupSelector.isLoading = false;
      mockLoadStudentsGroupSelector.isLoaded = true;

      mockCurrentStudentGroupsSelector.isLoading = false;
      mockCurrentStudentGroupsSelector.isLoaded = true;

      doBefor();
    });

    it('the component EditStudentsDetails should be rendered', () => {
      const { getByLabelText } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );
      const firstName = getByLabelText(/first name:/i);
      expect(firstName).toBeInTheDocument();
    });

    it('redirects to /404 if studentError && studentGroupsError', () => {
      mockCurrentStudentSelector.error = 'error';
      mockCurrentStudentGroupsSelector.error = 'error';

      render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
    });

    it('redirects to /students if !isEditedError && isEditedLoaded', () => {
      mockCurrentStudentSelector.error = '';
      mockCurrentStudentGroupsSelector.error = '';
      mockEditStudentSelector.isLoaded = true;

      render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.STUDENTS);
    });

    it('redirects to /students if !isRemovedError && isRemovedLoaded', () => {
      mockEditStudentSelector.isLoaded = false;
      mockRemoveStudentSelector.isLoaded = true;

      render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.STUDENTS);
    });
  });
});