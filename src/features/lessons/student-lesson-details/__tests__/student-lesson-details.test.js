import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { StudentLessonDetails } from '@/features';
import { commonHelpers } from '@/utils';

const lessonsData = [
  {
    comment: null,
    id: 1,
    lessonDate: '2021-06-15T08:38:34',
    mark: 10,
    presence: true,
    studentGroupId: 1,
    themeName: 'API testing',
  },
  {
    comment: null,
    id: 2,
    lessonDate: '2021-06-17T00:27:30',
    mark: null,
    presence: false,
    studentGroupId: 1,
    themeName: 'Junit',
  },
];

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}
));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

const mockSetState = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetState],
}));

describe('Render of student lesson details', () => {
  beforeEach(() => {
    const mockedLessonsSelector = {
      data: lessonsData,
      isLoading: false,
      isLoaded: true,
    };
    const mockedCurrentUserSelector = {
      currentUser: {
        email: 'student@gmail.com',
        first_name: 'student',
        id: 1,
        last_name: 'student',
        role: 1,
      },
    };

    const useActionsFns = {
      fetchStudentLessons: jest.fn(),
    };
    useSelector
      .mockReturnValueOnce(mockedCurrentUserSelector)
      .mockReturnValue(mockedLessonsSelector);
    useActions.mockReturnValue(useActionsFns.fetchStudentLessons);
    const useStateLessonData = {
      lessonData: '',
      setLessonData: jest.fn(),
    };
    React.useState = jest.fn()
      .mockReturnValueOnce([useStateLessonData.lessonData, useStateLessonData.setLessonData]);
    commonHelpers.transformDateTime = jest.fn().mockReturnValue({ date: '15.06.2021', time: '11:38' });
  });

  it('should the component be rendered', () => {
    const { getByTestId } = render(<StudentLessonDetails />);
    expect(getByTestId('studLessonDetails'))
      .toBeInTheDocument();
  });

  it('should loader appear when studentLessonsSelector.isLoading is true', () => {
    const mockedLessonsSelector = {
      data: lessonsData,
      isLoading: true,
      isLoaded: false,
    };
    useSelector.mockReturnValue(mockedLessonsSelector);
    const { container } = render(<StudentLessonDetails />);
    const loader = container.querySelector('.spinner-border');
    expect(loader).toBeInTheDocument();
  });

  it('should display correct lesson-data in proper places', async () => {
    const mockedLessonsSelector = {
      data: lessonsData,
      isLoaded: true,
    };
    useSelector.mockReturnValue(mockedLessonsSelector);

    const { getByTestId } = await render(<StudentLessonDetails />);
    const theme = getByTestId('theme');
    const date = getByTestId('date');
    const time = getByTestId('time');
    const presence = getByTestId('presence');
    const mark = getByTestId('mark');
    const comment = getByTestId('comment');
    await expect(theme.innerText).toBe(mockedLessonsSelector.themeName);
    await expect(date.innerText).toBe(commonHelpers.transformDateTime.date);
    await expect(time.innerText).toBe(commonHelpers.transformDateTime.time);
    await expect(presence.innerText).toBe(mockedLessonsSelector.presence);
    await expect(mark.innerText).toBe(mockedLessonsSelector.mark);
    await expect(comment.innerText).toBe(mockedLessonsSelector.comment);
  });

  it('should loader appear when studentLessonsSelector.isLoaded is false', () => {
    const mockedLessonsSelector = {
      isLoaded: false,
    };
    useSelector.mockReturnValue(mockedLessonsSelector);
    const { container } = render(<StudentLessonDetails />);
    const loader = container.querySelector('.spinner-border');
    expect(loader).toBeInTheDocument();
  });

  it('should loader appear when data in studentLessonsSelector is empty', () => {
    const mockedLessonsSelector = {
      data: [],
      isLoaded: false,
    };
    useSelector.mockReturnValue(mockedLessonsSelector);
    const { container } = render(<StudentLessonDetails />);
    const loader = container.querySelector('.spinner-border');
    expect(loader).toBeInTheDocument();
  });

  it('should the button Back redirect to correct URL', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const { getByTestId } = render(<Router history={historyMock}><StudentLessonDetails /></Router>);
    const backButton = getByTestId('backButton');
    fireEvent.click(backButton);

    expect(historyMock.push.mock.calls[0][0])
      .toEqual(paths.LESSONS);
  });

  it('should redirect to Not-Found if !lessons', async () => {
    const mockedLessonsSelector = {
      data: [],
      isLoaded: true,
    };
    await useSelector.mockReturnValue(mockedLessonsSelector);
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    await render(<Router history={historyMock}><StudentLessonDetails /></Router>);
    await expect(historyMock.push.mock.calls[0][0])
      .toEqual(paths.NOT_FOUND);
  });
});
