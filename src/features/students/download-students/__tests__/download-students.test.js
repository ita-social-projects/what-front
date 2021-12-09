import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DownloadStudents } from '../download-students.js';
import { paths, useActions } from '@/shared';
import {
  importStudentsMockData,
  loadStudentGroupsMockData,
} from '../mocks/mock-data.js';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn([jest.fn()]) }));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const useActionsFns = {
  sendStudents: jest.fn(),
  globalLoadsStudentsGroups: jest.fn(),
};

useActions.mockReturnValue([
  useActionsFns.sendStudents,
  useActionsFns.globalLoadsStudentsGroups,
]);

describe('DownloadStudents', () => {
  const history = useHistory();
  let formValues;

  beforeEach(() => {
    useSelector
      .mockReturnValue(loadStudentGroupsMockData)
      .mockReturnValue(importStudentsMockData);

    formValues = {
      groupId: '1',
      students: '../mocks/mock-file.xlsx',
    };
  });

  it('should render component', () => {
    const { container } = render(
      <Router>
        <DownloadStudents />
      </Router>
    );
    const downloadStudentsContainer = container.getElementsByClassName(
      'container'
    );

    expect(downloadStudentsContainer).toMatchSnapshot();
  });

  it('should navigate groups page if groups are loaded', () => {
    render(
      <Router>
        <DownloadStudents />
      </Router>
    );

    expect(history.push).toHaveBeenCalledWith(paths.GROUPS);
  });

  it('should validate the form', async () => {
    const { getByText } = render(
      <Router>
        <DownloadStudents />
      </Router>
    );

    const submitButton = getByText('Send');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
  });

  it('should submit the form with correct schema', async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <Router>
        <DownloadStudents />
      </Router>
    );

    const [downloadStudents] = useActions(useActionsFns.sendStudents);

    const groupId = getByRole('combobox');
    const students = getByLabelText('Choose File');
    const submitButton = getByText('Send');

    fireEvent.change(groupId, {
      target: {
        value: formValues.groupId,
      },
    });

    fireEvent.change(students, {
      target: {
        files: formValues.students,
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    downloadStudents({
      groupId: groupId.value,
      students: students.files,
    });

    expect(downloadStudents).toHaveBeenCalled();
  });
});
