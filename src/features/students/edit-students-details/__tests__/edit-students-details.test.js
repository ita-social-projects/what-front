import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { useSelector } from 'react-redux';

import {
  mockCurrentStudentSelector,
  mockLoadStudentsGroupSelector,
  mockCurrentStudentGroupsSelector,
} from './mock-data.js';

import { EditStudentsDetails } from '../edit-students-details.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('edit-student-details component', () => {
  let id;
  let historyMock;
  let useActionsFns;

  const doBefore = () => {
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
    beforeEach(doBefore);

    it('should show loader while areStudentGroupsLoading is true', () => {
      const mockLocalCurrentStudentSelector = {
        ...mockCurrentStudentSelector,
        isLoading: true,
      };

      useSelector
        .mockReturnValueOnce(mockLocalCurrentStudentSelector)
        .mockReturnValueOnce(mockLoadStudentsGroupSelector)
        .mockReturnValueOnce(mockCurrentStudentGroupsSelector);

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

      useSelector
        .mockReturnValueOnce(mockCurrentStudentSelector)
        .mockReturnValueOnce(mockAreGroupsLoading)
        .mockReturnValueOnce(mockCurrentStudentGroupsSelector);

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

      useSelector
        .mockReturnValueOnce(mockCurrentStudentSelector)
        .mockReturnValueOnce(mockLoadStudentsGroupSelector)
        .mockReturnValueOnce(mockLocalCurentStudentGroupsSelector);

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
    beforeEach(doBefore);

    it('should render correct data in correct place', () => {
      render(<EditStudentsDetails id={id} />);
      screen.debug();
    });
  });
});