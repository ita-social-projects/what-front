import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DownloadGroups } from '../download-groups';
import { BrowserRouter as Router } from 'react-router-dom';
import { useActions } from '@/shared';
import { useSelector } from 'react-redux';
import { mockedData, useStates, useStateMock, fileMock } from './mockedData';
import userEvent from '@testing-library/user-event';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

const historyMock = {
  push: jest.fn(),
  location: {},
};

const loadCoursesFns = {
  loadCourses: jest.fn(),
};

useActions.mockReturnValue([loadCoursesFns.loadCourses]);
describe('DownloadGroups', () => {
  let coursesData;

  beforeAll(() => {
    coursesData = {
      data: mockedData,
      isLoading: false,
      isLoaded: true,
    };
    useSelector.mockReturnValue(coursesData);
    React.useState = useStateMock.default;
  });
  it('render DownloadGroups component and details', () => {
    const { container } = render(
      <Router history={historyMock}>
        <DownloadGroups />
      </Router>
    );

    const containerFound = container.querySelector('.container');
    const input = container.querySelector('#actual-btn');
    const spanText = container.querySelector('.font-weight-bolder');

    expect(input).toHaveAttribute('hidden');
    expect(spanText).toBeInTheDocument();
    expect(containerFound).toBeInTheDocument();
  });

  it('submit form', async () => {
    const { container, getByText } = render(
      <Router history={historyMock}>
        <DownloadGroups />
      </Router>
    );
    const onSubmit = jest.fn();

    const saveBtn = getByText('Send');
    expect(saveBtn).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(saveBtn);
      onSubmit();
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  it('check label after downloading the component', async () => {
    React.useState = useStateMock.default;

    const { container } = render(
      <Router history={historyMock}>
        <DownloadGroups />
      </Router>
    );

    const onChange = jest.fn();

    const spanText = container.querySelector('#filename');
    const chooseFileBtn = container.querySelector('.form-control');
    const input = container.querySelector('#actual-btn');
    const file = [
      new File(['file'], 'file.xlsx', { type: 'application/xlsx' }),
    ];

    expect(spanText).toBeInTheDocument();
    expect(spanText.value).toBe(undefined);
    expect(chooseFileBtn).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(chooseFileBtn);
      fireEvent.load(input, file);
      onChange();
    });
    expect(file).toHaveLength(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(spanText.value).toEqual(file.name);
    expect.stringContaining('file.xlsx');

  });
});