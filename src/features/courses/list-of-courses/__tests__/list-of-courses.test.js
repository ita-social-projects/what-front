import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { ListOfCourses } from '@/features';
import { mockAppState } from './mocks/mock-data.js';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

const useActionsFns = {
  loadActiveCourses: jest.fn(),
  loadNotActiveCourses: jest.fn(),
};
useActions.mockReturnValue([
  useActionsFns.loadActiveCourses,
  useActionsFns.loadNotActiveCourses,
]);

describe('ListOfCourses tests', () => {
  let currentMockAppState;
  let historyMock;
  beforeEach(() => {
    currentMockAppState = JSON.parse(JSON.stringify(mockAppState));
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    useSelector.mockImplementation((cb) => cb(mockAppState));
  });
  afterEach(() => {
    useSelector.mockClear();
  });

  it('Loader appears when isLoading in data is true', () => {
    currentMockAppState.models.courses.coursesActive.isLoading = true;
    useSelector.mockImplementation((cb) => cb(currentMockAppState));
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const loader = container.querySelector('.spinner-border');
    expect(loader).toBeInTheDocument();
  });

  it('should the component be rendered', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const table = container.querySelector('.table');
    expect(table).toBeInTheDocument();
  });

  it('should the message be rendered if courses list is empty', () => {
    currentMockAppState.models.courses.coursesActive.data.length = 0;
    useSelector.mockImplementation((cb) => cb(currentMockAppState));
    const { getByText } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const notFoundMessage = getByText('Course is not found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('should the pagination be rendered', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const pagination = container.querySelector('.pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('should change layout to block when clicked by showBlocksBtn', async () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const showCardBlocksBtn = getByTestId('showCardBlocks');
    await waitFor(() => {
      fireEvent.click(showCardBlocksBtn);
    });
    const cardBlocksContainer = getByTestId('cardBlocks');
    expect(cardBlocksContainer).toBeInTheDocument();
  });

  it('should render pagination when courses length > coursesPerPage', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const pagination = container.querySelector('.pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('should not render pagination when courses length < coursesPerPage', () => {
    currentMockAppState.models.courses.coursesActive.data.length = 4;
    useSelector.mockImplementation((cb) => cb(currentMockAppState));
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const pagination = container.querySelector('.pagination');
    expect(pagination).not.toBeInTheDocument();
  });

  it('should render only notActive courses when clicked by switchDisabled checkbox', async () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const switchDisabledCheckbox = container.querySelector('#switchDisabled');
    await waitFor(() => {
      fireEvent.click(switchDisabledCheckbox);
    });
    const rows = container.querySelectorAll('.table>tbody>tr');
    expect(rows.length).toBe(1);
  });

  it('should render only notActive courses when clicked by switchDisabled checkbox', async () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const switchDisabledCheckbox = container.querySelector('#switchDisabled');
    await waitFor(() => {
      fireEvent.click(switchDisabledCheckbox);
    });
    const rows = container.querySelectorAll('.table>tbody>tr');
    expect(rows.length).toBe(1);
  });

  it('Should be redirected to path COURSE_ADD when addCourseBtn is clicked.', () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const addCourseBtn = getByTestId('addCourseBtnText').parentElement;
    fireEvent.click(addCourseBtn);
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.COURSE_ADD);
  });

  it('Should be redirected to path COURSE_DETAILS when course row is clicked.', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const row = container.querySelector('.table>tbody>tr');
    fireEvent.click(row);
    expect(historyMock.push.mock.calls[0][0].pathname).toEqual(
      paths.COURSE_DETAILS + '/1'
    );
  });

  it('Should be redirected to path COURSE_EDIT when course editIcon is clicked.', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const icon = container.querySelector('.table>tbody>tr>:last-child>svg');
    fireEvent.click(icon);
    expect(historyMock.push.mock.calls[0][0].pathname).toEqual(
      paths.COURSE_EDIT + '/1'
    );
  });

  it('Should be sorted correctly when sort icon is clicked two times.', () => {
    const { container } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    let firstRowTitle;
    const icon = container.querySelector('[data-sorting-param="name"]');
    fireEvent.click(icon);
    firstRowTitle = container.querySelector('.table>tbody>tr>:first-child');
    expect(firstRowTitle.textContent).toEqual('3D Modelling');
    fireEvent.click(icon);
    firstRowTitle = container.querySelector('.table>tbody>tr>:first-child');
    expect(firstRowTitle.textContent).toEqual('course6');
  });
  
  it('Should be render 1 item in course list if search by name `3D`', () => {
    const { container, getByTestId } = render(
      <Router history={historyMock}>
        <ListOfCourses />
      </Router>
    );
    const input = getByTestId('searchInputWrap').querySelector('input');
    fireEvent.change(input, { target: { value: '3D' } });
    const rows = container.querySelectorAll('.table>tbody>tr');
    expect(rows.length).toBe(1);
    const firstRowTitle = rows[0].firstElementChild;
    expect(firstRowTitle.textContent).toEqual('3D Modelling');
  });
});
