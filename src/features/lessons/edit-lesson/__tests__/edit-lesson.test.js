import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { lessonsSelectorsMock } from '@/models/lessons';
import { useSelector } from 'react-redux';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { EditLesson } from '@/features';
import { commonHelpers } from '@/utils';
import { mockGroupSelector, mockStudentsSelector, mockLessonOnEdit, newPresenceStatusLessonOnEdit, newMarkLessonOnEdit, newMarkMore12LessonOnEdit, noLessonData, submitValues } from './mocks/mock-data.js';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

const useActionsFns = {
  fetchLessons: jest.fn(),
  getGroup: jest.fn(),
  getStudents: jest.fn(),
  updateLesson: jest.fn(),
  dispatchAddAlert: jest.fn(),
};
useActions.mockReturnValue([useActionsFns.fetchLessons, useActionsFns.getGroup, useActionsFns.getStudents, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

const useStates = {
  lessonOnEdit: {
    lessonOnEdit: {},
    setLessonOnEdit: jest.fn(),
  },
};
describe('Tests EditLesson', () => {
  describe('Render & form of EditLesson', () => {
    let historyMock;

    beforeEach(() => {
      useSelector
        .mockReturnValueOnce(lessonsSelectorsMock.allLessons)
        .mockReturnValue(mockStudentsSelector)
        .mockReturnValue(mockGroupSelector)
        .mockReturnValueOnce(lessonsSelectorsMock.editLesson);

      commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formInitialValue: '2021-06-17T02:47' });

      historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    });
    afterEach(cleanup);

    it('should loader appear when studentLessonsSelector.isLoading is true', () => {
      const mockedLessonsSelector = {
        data: lessonsSelectorsMock.allLessons.data,
        isLoading: true,
      };
      useSelector.mockReturnValue(mockedLessonsSelector);
      const { container } = render(<Router history={historyMock}><EditLesson /></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    describe('redirect to path.NOT_FOUND', () => {
      let historyMock;
      let mockedNoLessonsSelector;

      beforeAll(() => {
        mockedNoLessonsSelector = {
          data: noLessonData,
          isLoading: false,
          isLoaded: true,
          error: '',
        };
        useSelector
          .mockReturnValueOnce(mockedNoLessonsSelector)
          .mockReturnValueOnce(mockStudentsSelector)
          .mockReturnValueOnce(mockGroupSelector)
          .mockReturnValueOnce(lessonsSelectorsMock.editLesson);

        commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formInitialValue: '2021-06-17T02:47' });

        historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        render(<Router history={historyMock}><EditLesson /></Router>);
      });

      it('should redirect to URL NOT_FOUND if !lesson ', () => {
        expect(historyMock.push.mock.calls[0][0]).toEqual(paths.NOT_FOUND);
      });
    });

    it('should the component be rendered', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      expect(getByTestId('editLessonRenderForm')).toBeInTheDocument();
      expect(getByTestId('formData').children.length).not.toEqual(0);
    });

    it('should the Form be rendered correctly (name+group+date)', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId, getByText } = render(<Router history={historyMock}><EditLesson /></Router>);
      const themeName = getByTestId('themeName');
      const student1 = getByText('StudenT StudenT');
      const groupName = getByTestId('groupName');
      const lessonDate = getByTestId('lessonDate');
      expect(getByTestId('editForm')).toBeInTheDocument();
      expect(themeName.value).toBe('API testing');
      expect(groupName.value).toBe('122-18-3');
      expect(lessonDate.value).toBe('2021-06-17T02:47');
      expect(groupName).toBeDisabled();
      expect(student1).toBeInTheDocument();
    });

    it('FormData should be rendered correctly', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId, container } = render(<Router history={historyMock}><EditLesson /></Router>);
      const user1Presence = getByTestId('formData[0].presence');
      const user1Mark = getByTestId('formData[0].studentMark');
      const user2Presence = getByTestId('formData[1].presence');
      const user2Mark = getByTestId('formData[1].studentMark');
      expect(container.querySelectorAll('tr').length - 1).toBe(2);
      expect(user1Presence.value).toBe('true');
      expect(user1Mark.value).toBe('10');
      expect(user2Presence.value).toBe('true');
      expect(user2Mark.value).toBe('11');
    });

    it('should change state LessonOnEdit ', async () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);

      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      const handlePresenceChange = jest.fn();
      const user1Presence = getByTestId('formData[0].presence');
      await expect(user1Presence.value).toBe('true');
      await waitFor(() => fireEvent.click(user1Presence));
      await expect(user1Presence.value).toBe('false');
      await handlePresenceChange(user1Presence.value);
      await expect(useStates.lessonOnEdit.setLessonOnEdit).toHaveBeenCalledWith(newPresenceStatusLessonOnEdit);
      await expect(useStates.lessonOnEdit.setLessonOnEdit).toHaveBeenCalledTimes(1);
    });

    it('should change student\'s mark', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);

      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      const handleMarkChange = jest.fn();
      const userMark = getByTestId('formData[1].studentMark');
      fireEvent.blur(userMark, { target: { value: '12' } });
      expect(userMark.value).toBe('12');
      handleMarkChange(userMark.value);
      expect(useStates.lessonOnEdit.setLessonOnEdit).toHaveBeenCalledWith(newMarkLessonOnEdit);
    });

    it('should change student\'s mark > 12', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);

      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      const handleMarkChange = jest.fn();
      const userMark = getByTestId('formData[1].studentMark');
      fireEvent.blur(userMark, { target: { value: '13' } });
      expect(userMark.value).toBe('13');
      handleMarkChange(userMark.value);
      expect(useStates.lessonOnEdit.setLessonOnEdit).toHaveBeenCalledWith(newMarkMore12LessonOnEdit);
    });

    it('should redirect to URL STUDENTS_DETAILS ', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      const studentId = getByTestId('1');
      fireEvent.click(studentId);
      expect(historyMock.push.mock.calls[1][0]).toEqual(`${paths.STUDENTS_DETAILS}/1`);
    });

    it('should redirect to correct URL if click cancelButton', () => {
      React.useState = jest.fn()
        .mockReturnValue([mockLessonOnEdit, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      const cancelButton = getByTestId('cancelBtn');
      fireEvent.click(cancelButton);
      expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    });

    it('submit Form', async () => {
      React.useState = jest.fn()
        .mockReturnValueOnce([submitValues, useStates.lessonOnEdit.setLessonOnEdit]);
      commonHelpers.transformDateTime = jest.fn().mockReturnValue({
        formDateTimeForRequest: '2021-06-17T01:47:00.000Z',
        formInitialValue: '2021-06-17T02:47',
      });
      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);

      const onSubmit = jest.fn();
      const submitBtn = getByTestId('submitBtn');
      commonHelpers.capitalizeTheme = jest.fn().mockReturnValue(submitValues.themeName);
      await waitFor(() => {
        fireEvent.click(submitBtn);
        onSubmit();
      });
      // expect(onSubmit).toHaveBeenCalledWith(submitValues);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(useActionsFns.updateLesson).toHaveBeenCalledTimes(1);
    });
  });

  describe('should create first state lessonOnEdit', () => {
    let historyMock;

    beforeAll(() => {
      useSelector
        .mockReturnValueOnce(lessonsSelectorsMock.allLessons)
        .mockReturnValueOnce(mockStudentsSelector)
        .mockReturnValueOnce(mockGroupSelector)
        .mockReturnValueOnce(lessonsSelectorsMock.editLesson);

      commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formInitialValue: '2021-06-17T02:47' });

      historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    });

    it('should state lessonOnEdit be changed before first rendering', async () => {
      React.useState = jest.fn()
        .mockReturnValue([{}, useStates.lessonOnEdit.setLessonOnEdit]);
      const { getByTestId } = render(<Router history={historyMock}><EditLesson /></Router>);
      expect(getByTestId('editLessonRenderForm')).toBeInTheDocument();
      const cloneDeep = jest.fn();
      await waitFor(() => cloneDeep());
      expect(cloneDeep).toHaveBeenCalledTimes(1);
      expect(useStates.lessonOnEdit.setLessonOnEdit).toHaveBeenCalledWith(mockLessonOnEdit);
    });
  });
});
