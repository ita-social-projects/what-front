import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { MentorDetails } from '@/features';
import { mockMentorIdSelector, mockMentorGroupsSelector, mockMentorCoursesSelector } from './mocks/mock-data.js';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));

jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

const id = 1;
let historyMock;

describe('Mentor-details component', () => {
  describe('loaders', () => {
    beforeEach(() => {
      const useActionFns = {
        dispatchLoadMentors: jest.fn()
      };
      useActions.mockReturnValue([useActionFns.dispatchLoadMentors]);
      historyMock = {push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn()};
    });
  
    it('should show loader while mentorIsLoading is true', () => {
      const mockLocalMentorIdSelector = {...mockMentorIdSelector, isLoading: true};
      useSelector
          .mockReturnValueOnce(mockLocalMentorIdSelector)
          .mockReturnValueOnce(mockMentorGroupsSelector)
          .mockReturnValueOnce(mockMentorCoursesSelector);
      const {container} = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  
    it('should show loader while mentorGroupsAreLoading is true', () => {
      const mockLocalMentorGroupsSelector = {...mockMentorGroupsSelector, isLoading: true };
      useSelector
          .mockReturnValueOnce(mockMentorIdSelector)
          .mockReturnValueOnce(mockLocalMentorGroupsSelector)
          .mockReturnValueOnce(mockMentorCoursesSelector);
      const { container } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  
    it('should show loader while mentorCoursesAreLoading is true', () => {
      const mockLocalMentorCoursesSelector = {...mockMentorCoursesSelector, isLoading: true};
      useSelector
          .mockReturnValueOnce(mockMentorIdSelector)
          .mockReturnValueOnce(mockMentorGroupsSelector)
          .mockReturnValueOnce(mockLocalMentorCoursesSelector);
      const { container } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  });
  
  describe('content', () => {
    beforeEach(() => {
      useSelector
        .mockReturnValueOnce(mockMentorIdSelector)
        .mockReturnValueOnce(mockMentorGroupsSelector)
        .mockReturnValueOnce(mockMentorCoursesSelector);
  
      const useActionFns = {
        dispatchLoadMentors: jest.fn()
      };
  
      useActions.mockReturnValue([useActionFns.dispatchLoadMentors]);
  
      historyMock = {push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn()};
    });
  
    it('should be rendered', () => {
      const { getByTestId } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      expect(getByTestId('mentorDetails')).toBeInTheDocument();
    });
  
    it('should render correct mentors data in correct place', () => {
      const { getByTestId } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const firstName = getByTestId('firstName');
      const lastName = getByTestId('lastName');
      const email = getByTestId('email');
      expect(firstName.textContent).toBe(mockMentorIdSelector.data.firstName);
      expect(lastName.textContent).toBe(mockMentorIdSelector.data.lastName);
      expect(email.textContent).toBe(mockMentorIdSelector.data.email);
    });
  
    it('should render correct groups and courses data in correct place', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const groupLinks = queryAllByTestId('groupLink');
      const courseLinks = queryAllByTestId('courseLink');
      groupLinks.map((item, id) => expect(item.textContent).toBe(mockMentorGroupsSelector.data[id].name));
      courseLinks.map((item, id) => expect(item.textContent).toBe(mockMentorCoursesSelector.data[id].name));
    });
  
    it('should direct user to links name group page', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const groupLinks = queryAllByTestId('groupLink');
      groupLinks.map((item) => {
        const groupId = item.getAttribute('data-testgroupidparam');
        fireEvent.click(item);
        expect(historyMock.push.mock.calls[0][0]).toEqual(`${paths.GROUPS_DETAILS}/${groupId}`);
      });
    });
  
    it('should direct user to links name course page', () => {
      const { queryAllByTestId } = render(<Router history={historyMock}><MentorDetails id={id}/></Router>);
      const courseLinks = queryAllByTestId('courseLink');
      courseLinks.map((item) => {
        const courseId = item.getAttribute('data-testcourseidparam');
        fireEvent.click(item);
        expect(historyMock.push.mock.calls[0][0]).toEqual(`${paths.COURSE_DETAILS}/${courseId}`);
      });
    });
  });
});

