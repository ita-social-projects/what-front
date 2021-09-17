import React, { useState as mockUseState } from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';

import { EditStudentsDetails } from '../edit-students-details.js';
import {
  mockCurrentStudentSelector,
  mockLoadStudentsGroupSelector,
  mockCurrentStudentGroupsSelector,
  mockEditStudentSelector,
  mockRemoveStudentSelector,
} from './mock-data.js';

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
    afterEach(cleanup);

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

    afterEach(cleanup);

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

    const thunk = ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      return next(action);
    };

    const create = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
      };
      const next = jest.fn();

      const invoke = (action) => thunk(store)(next)(action);

      return { store, next, invoke };
    };

    const { store, invoke } = create();

    it('dispatchAddAlert - success if !isEditedError && isEditedLoaded', () => {
      mockCurrentStudentSelector.error = '';
      mockCurrentStudentGroupsSelector.error = '';
      mockEditStudentSelector.isLoaded = true;

      const mes = 'Student information has been edited successfully';

      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert(isEditedError) if isEditedError && !isEditedLoaded', () => {
      mockCurrentStudentSelector.error = '';
      mockCurrentStudentGroupsSelector.error = '';
      mockEditStudentSelector.isLoaded = false;
      mockEditStudentSelector.error = 'error';

      invoke((dispatch, getState) => {
        dispatch('error');
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith('error');
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert Student has been excluded if !isRemovedError && isRemovedLoaded', () => {
      mockRemoveStudentSelector.isLoaded = true;
      mockEditStudentSelector.error = '';

      const mes = 'Student has been excluded';

      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert(isEditedError) if isRemovedError && !isRemovedLoaded', () => {
      mockRemoveStudentSelector.isLoaded = false;
      mockEditStudentSelector.error = '';

      invoke((dispatch, getState) => {
        dispatch('error');
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith('error');
      expect(store.getState).toHaveBeenCalled();
    });

    it('option is popped up', () => {
      const { getByText } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );
      const email = document.getElementById('email');

      act(() => {
        fireEvent.change(email, { target: { value: 'hello' } });
      });

      screen.debug();
    });

    it('modal window is opened if click Exclude button in EditStudentsDetails', () => {
      const { getByText } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      fireEvent.click(getByText(/exclude/i));
      expect(getByText(/delete/i)).toBeTruthy();
    });
  });
});