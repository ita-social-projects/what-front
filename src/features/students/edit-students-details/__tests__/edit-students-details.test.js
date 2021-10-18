import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';

import { EditStudentsDetails } from '../edit-students-details.js';
import {
  mockCurrentStudentSelector,
  mockLoadStudentGroupsSelector,
  mockCurrentStudentGroupsSelector,
  mockEditStudentSelector,
  mockRemoveStudentSelector,
  useActionsFns,
} from './mock-data.js';

useActions.mockReturnValue(
  [
    useActionsFns.updateStudent,
    useActionsFns.deleteStudent,
    useActionsFns.dispatchAddAlert,
  ],
);

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('edit-student-details component', () => {
  let id;
  let historyMock;

  const doBefor = () => {
    historyMock = {
      push: jest.fn(),
      location: {},
      listen: jest.fn(),
      createHref: jest.fn(),
    };

    useSelector
      .mockReturnValue(mockCurrentStudentSelector)
      .mockReturnValue(mockLoadStudentGroupsSelector)
      .mockReturnValue(mockCurrentStudentGroupsSelector);

    id = 1;
  };

  describe('test loader', () => {
    beforeEach(doBefor);

    it('should show loader while isStudentLoading && areGroupsLoading', () => {
      useSelector
        .mockReturnValue({ ...mockCurrentStudentSelector, isLoading: true })
        .mockReturnValue({ ...mockLoadStudentGroupsSelector, isLoading: true });

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });

    it('should show loader while isStudentLoading && !areGroupsLoading', () => {
      useSelector.mockReturnValue({ ...mockCurrentStudentSelector, isLoading: true });
      useSelector.mockReturnValue({ ...mockLoadStudentGroupsSelector, isLoading: false });

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });

    it('should show loader while !isStudentLoaded && areGroupsLoading', () => {
      useSelector
        .mockReturnValue({ ...mockCurrentStudentSelector, isLoaded: false })
        .mockReturnValue({ ...mockCurrentStudentGroupsSelector, isLoading: true });

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });

    it('should show loader while !isStudentLoaded && !areGroupsLoading', () => {
      useSelector
        .mockReturnValue({ ...mockCurrentStudentSelector, isLoaded: false })
        .mockReturnValue({ ...mockCurrentStudentGroupsSelector, isLoading: false });

      const { container } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });
  });

  describe('test content', () => {
    beforeEach(() => {
      useSelector
        .mockReturnValue({ ...mockCurrentStudentSelector, isLoading: false, isLoaded: true })
        .mockReturnValue({ ...mockLoadStudentGroupsSelector, isLoading: false, isLoaded: true })
        .mockReturnValue({ ...mockCurrentStudentGroupsSelector, isLoading: false, isLoaded: true });
    });

    it('the component EditStudentsDetails should be rendered', () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(getByRole('textbox', { name: 'First Name:' })).toBeInTheDocument();
      expect(getByRole('textbox', { name: 'Last Name:' })).toBeInTheDocument();
      expect(getByRole('textbox', { name: 'Email:' })).toBeInTheDocument();
      expect(getByRole('combobox', { name: 'Group(`s):' })).toBeInTheDocument();
    });

    it('redirects to /404 if studentError && studentGroupsError', () => {
      useSelector
        .mockReturnValue({ ...mockCurrentStudentSelector, error: 'error' })
        .mockReturnValue({ ...mockCurrentStudentGroupsSelector, error: 'error' });

      render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
    });

    it('redirects to /students if !isEditedError && isEditedLoaded', () => {
      useSelector
        .mockReturnValue({ ...mockEditStudentSelector, isLoaded: true, error: '' })
        .mockReturnValue({ ...mockCurrentStudentSelector, error: '' });

      render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.STUDENTS);
    });

    it('redirects to /students if !isRemovedError && isRemovedLoaded', () => {
      useSelector
        .mockReturnValue({ ...mockRemoveStudentSelector, isLoaded: true })
        .mockReturnValue({ ...mockEditStudentSelector, isLoaded: false });

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
      useSelector
        .mockReturnValue({ ...mockEditStudentSelector, isLoaded: true })

      const mes = 'Student information has been edited successfully';

      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert(isEditedError) if isEditedError && !isEditedLoaded', () => {
      useSelector
        .mockReturnValue({ ...mockEditStudentSelector, isLoaded: false, error: 'error' });

      const mes = 'error';

      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert Student has been excluded if !isRemovedError && isRemovedLoaded', () => {
      useSelector.mockReturnValue({ ...mockRemoveStudentSelector, isLoaded: true });

      const mes = 'Student has been excluded';

      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('dispatchAddAlert(isEditedError) if isRemovedError && !isRemovedLoaded', () => {
      useSelector.mockReturnValue({ ...mockRemoveStudentSelector, isLoaded: false });

      const mes = 'error';
      invoke((dispatch, getState) => {
        dispatch(mes);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(mes);
      expect(store.getState).toHaveBeenCalled();
    });

    it('modal window is opened if click Exclude button in EditStudentsDetails', () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      fireEvent.click(getByRole('button', { name: 'Exclude' }));

      expect(getByRole('button', { name: 'Delete' })).toBeTruthy();
      expect(getByRole('button', { name: 'Cancel' })).toBeTruthy();
    });

    it('shouldn\'t add student group if group isn\'t from datalist', async () => {
      const { getByRole, getByText } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      const groupsInput = getByRole('combobox');

      fireEvent.change(groupsInput, { target: { value: 'Dnp-2021' } });

      fireEvent.click(getByRole('button', { name: '+' }));

      await waitFor(() => {
        expect(getByText('Invalid group name')).toBeInTheDocument();
      });
    });

    it('should delete group if click X', () => {
      const NUM_OF_X_AFTER_DELETE = 1;

      const { getAllByText } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      fireEvent.click(getAllByText('X')[0]);

      expect(getAllByText('X').length).toBe(NUM_OF_X_AFTER_DELETE);
    });

    it('should be delete student', () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      fireEvent.click(getByRole('button', { name: 'Exclude' }));

      fireEvent.click(getByRole('button', { name: 'Delete' }));

      invoke((dispatch, getState) => {
        dispatch(id);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(id);
      expect(store.getState).toHaveBeenCalled();
    });

    it('should save edited student', () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      const save = getByRole('button', { name: 'Save' });

      fireEvent.click(save);

      invoke((dispatch, getState) => {
        dispatch(id, mockCurrentStudentSelector.data);
        getState();
      });

      expect(store.dispatch).toHaveBeenCalledWith(id, mockCurrentStudentSelector.data);
      expect(store.getState).toHaveBeenCalled();
    });

    it('shouldn`t save student if some field is uncorrect', async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <EditStudentsDetails id={id} />
        </Router>
      );

      const groupsInput = getByRole('combobox');

      fireEvent.change(groupsInput, { target: { value: '' } });

      await waitFor(() => {
        expect(getByRole('button', { name: 'Save' })).toBeDisabled();
      });
    });
  });
});