import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { paths } from '@/shared';
import { useSelector } from 'react-redux';
import { mockCurrentStudentSelector, 
         mockCurrentStudentGroupsSelector, 
         mockStudentsLessonsSelector }
from './mock-data.js';
import { StudentDetails } from '../student-details.js';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));
jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

describe('Student-details component', () => {
  let historyMock;
  describe('loaders', () => {
    beforeEach(() => {
      historyMock = {push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn()};
    });

    it('should show loader while isStudentLoading is true', () => {
      const mockLocalCurrentStudentSelector = {...mockCurrentStudentSelector, isLoading: true};
      useSelector
          .mockReturnValueOnce(mockLocalCurrentStudentSelector)
          .mockReturnValueOnce(mockCurrentStudentGroupsSelector)
          .mockReturnValueOnce(mockStudentsLessonsSelector);
      const {container} = render(<Router history={historyMock}><StudentDetails /></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader while areStudentGroupsLoading is true', () => {
      const mockLocalCurrentStudentGroupsSelector = {...mockCurrentStudentGroupsSelector, isLoading: true};
      useSelector
          .mockReturnValueOnce(mockCurrentStudentSelector)
          .mockReturnValueOnce(mockLocalCurrentStudentGroupsSelector)
          .mockReturnValueOnce(mockStudentsLessonsSelector);
      const {container} = render(<Router history={historyMock}><StudentDetails /></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader while studentLessonsIsLoading is true', () => {
      const mockLocalStudentsLessonsSelector = {...mockStudentsLessonsSelector, isLoading: true};
      useSelector
          .mockReturnValueOnce(mockCurrentStudentSelector)
          .mockReturnValueOnce(mockCurrentStudentGroupsSelector)
          .mockReturnValueOnce(mockLocalStudentsLessonsSelector);
      const {container} = render(<Router history={historyMock}><StudentDetails /></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  });

  describe ('content', () => {
    beforeEach(() => {
      useSelector
          .mockReturnValueOnce(mockCurrentStudentSelector)
          .mockReturnValueOnce(mockCurrentStudentGroupsSelector)
          .mockReturnValueOnce(mockStudentsLessonsSelector);
      historyMock = {push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn()};
    });

    it('should render correct students data in correct place', () => {
      const { getByTestId } = render(<Router history={historyMock}><StudentDetails /></Router>);
      const firstName = getByTestId('firstName');
      const lastName = getByTestId('lastName');
      const email = getByTestId('email');
      expect(firstName.textContent).toBe(mockCurrentStudentSelector.data.firstName);
      expect(lastName.textContent).toBe(mockCurrentStudentSelector.data.lastName);
      expect(email.textContent).toBe(mockCurrentStudentSelector.data.email);
    });

    it('should render correct groups and courses data in correct place', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><StudentDetails /></Router>);
      const groupLinks = queryAllByTestId('groupLink');
      const courseLinks = queryAllByTestId('courseLink');
      groupLinks.map((item, id) => expect(item.textContent).toBe(mockCurrentStudentGroupsSelector.data[id].name));
      courseLinks.map((item, id) => expect(item.textContent).toBe(mockStudentsLessonsSelector.data[id].name));
    });

    it('should direct user to links name group page', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><StudentDetails /></Router>);
      const groupLinks = queryAllByTestId('groupLink');
      groupLinks.map((item, i) => {
        const groupId = item.getAttribute('data-testgroupidparam');
        fireEvent.click(item);
        expect(historyMock.push.mock.calls[i][0]).toEqual(`${paths.GROUPS_DETAILS}/${groupId}`);
      });
    });

    it('should direct user to links name lessons page', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><StudentDetails /></Router>);
      const lessonLinks = queryAllByTestId('lessonLink');
      lessonLinks.map((item, i) => {
        const lessonId = item.getAttribute('data-testlessonidparam');
        fireEvent.click(item);
        expect(historyMock.push.mock.calls[i][0]).toEqual(`${paths.LESSON_DETAILS}/${lessonId}`);
      });
    });
  });
});