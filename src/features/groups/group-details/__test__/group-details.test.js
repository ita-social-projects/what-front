import React from 'react';
import { Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';

import { paths } from '@/shared';
import { commonHelpers } from "@/utils";
import { GroupDetails } from '../group-details';
import { groupDetailsMock } from "./__mocks__/mockedData.js";

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("@/shared/hooks", () => ({ useActions: jest.fn() }));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('Render of GroupDetails', () => {
  let studentGroupSelector;
  let mentorsSelector;
  let coursesSelector;
  let studentsSelector;
  let historyMock;
  let id;

  beforeEach(() => {
    studentGroupSelector = groupDetailsMock.studentGroupData;
    mentorsSelector = groupDetailsMock.mentorsData;
    coursesSelector = groupDetailsMock.coursesData;
    studentsSelector = groupDetailsMock.studentsData;
    id = groupDetailsMock.id;

    historyMock = { push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn() };
    commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formInitialValue: '2022-06-16' });

    useSelector
      .mockReturnValueOnce(studentGroupSelector)
      .mockReturnValueOnce(mentorsSelector)
      .mockReturnValueOnce(coursesSelector)
      .mockReturnValueOnce(studentsSelector);
  });
  
  afterEach(cleanup);

  it('Should the component be rendered.', () => {

    const { container } = render(
      <Router history={historyMock}>
        <GroupDetails id={id}
                      studentGroupData={studentGroupSelector}
                      studentsData={studentsSelector}
                      mentorsData={mentorsSelector}
                      coursesData={coursesSelector} />
      </Router>
    );

    const groupDetailsContainer = container.getElementsByClassName('container');

    expect(groupDetailsContainer).toMatchSnapshot();
  });

  it('should loader appear when data is false', () => {
    studentGroupSelector = {
      data: groupDetailsMock.studentGroupData.data,
      isLoading: true,
      isLoaded: false,
      error: ''
    };

    useSelector.mockReturnValue(studentGroupSelector);

    const { container } = render(
      <Router history={historyMock}>
        <GroupDetails id={id}
          studentGroupData={studentGroupSelector}
          studentsData={studentsSelector}
          mentorsData={mentorsSelector}
          coursesData={coursesSelector} />
      </Router>);

    const loader = container.querySelector('.spinner-border');
    expect(loader).toBeInTheDocument();
  });

  it('should the h2 element contain "Group: Soft Skills for Lecturers - 2021/2"', () => {
    const { container } = render(
      <Router history={historyMock}>
        <GroupDetails id={id}
          studentGroupData={studentGroupSelector}
          studentsData={studentsSelector}
          mentorsData={mentorsSelector}
          coursesData={coursesSelector} />
      </Router>);

    const header = container.querySelector('h2');
    expect(header.innerHTML).toBe('Group: Soft Skills for Lecturers - 2021/2');
  });

  it('should the table content match', () => {
    const { container } = render(
      <Router history={historyMock}>
        <GroupDetails id={id}
          studentGroupData={studentGroupSelector}
          studentsData={studentsSelector}
          mentorsData={mentorsSelector}
          coursesData={coursesSelector} />
      </Router>);

    const table = container.querySelector('tbody');
    expect(table.innerHTML).toBe('<tr><td>1</td><td>Richard Thomas</td><td>richard.thomas@example.com</td></tr><tr><td>2</td><td>Joseph Evans</td><td>joseph.evans@example.com</td></tr><tr><td>3</td><td>Thomas Roberts</td><td>thomas.roberts@example.com</td></tr><tr><td>4</td><td>Barbara Harris</td><td>barbara.harris@example.com</td></tr><tr><td>5</td><td>Susan Clark</td><td>susan.clark@example.com</td></tr><tr><td>6</td><td>Jessica Cooper</td><td>jessica.cooper@example.com</td></tr>');
  });

  it('should url change to "/students/2"', () => {
    const { container } = render(
      <Router history={historyMock}>
        <GroupDetails id={id}
          studentGroupData={studentGroupSelector}
          studentsData={studentsSelector}
          mentorsData={mentorsSelector}
          coursesData={coursesSelector} />
      </Router>);


    userEvent.click(screen.getByText('Richard Thomas'));
    window.history.pushState({}, 'Richard Thomas page', '/students/2');
    expect(global.window.location.pathname).toEqual('/students/2');
  });

  it('Should redirect to 404 page in case of error in course details data.', () => {
    const history = createMemoryHistory();

    useSelector.mockReturnValue({
      ...studentGroupSelector,
      error: 'Something went wrong',
      loaded: false,
    });

    render(
      <Router history={history}>
         <GroupDetails id={id}
          studentGroupData={studentGroupSelector}
          studentsData={studentsSelector}
          mentorsData={mentorsSelector}
          coursesData={coursesSelector} />
      </Router>
    );

    history.push(paths.NOT_FOUND);
    expect(history.location.pathname).toBe(paths.NOT_FOUND);
  });

});