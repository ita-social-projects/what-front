import React, { useState } from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  fireEvent,
  render,
  waitFor,
  getByPlaceholderText,
  prettyDOM,
} from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { LessonDetails } from '../lesson-details';
import {
  studentsMock,
  mentorsMock,
  groupsMock,
  lessonsMock,
  formDataMock,
} from '../__mocks__/mockedData';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const useStates = {
  studentsGroup: {
    studentsGroup: groupsMock[0],
    setStudentsGroup: jest.fn(),
  },
  lesson: {
    lesson: lessonsMock[0],
    setLesson: jest.fn(),
  },
  formData: {
    formData: formDataMock,
    setFormData: jest.fn(),
  },
  mentor: {
    mentor: mentorsMock[0],
    setMentor: jest.fn(),
  },
};

describe('lesson-details tests', () => {
  let historyMock;
  let mockLessonsSelector;
  let mockMentorsSelector;
  let mockGroupsSelector;
  let mockStudentsSelector;
  let useActionsFns;

  describe('Loaders tests', () => {
    beforeEach(() => {
      mockLessonsSelector = {
        data: lessonsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      mockMentorsSelector = {
        data: mentorsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      mockGroupsSelector = {
        data: groupsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      mockStudentsSelector = {
        data: studentsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      useSelector
        .mockReturnValue(mockLessonsSelector)
        .mockReturnValue(mockMentorsSelector)
        .mockReturnValue(mockGroupsSelector)
        .mockReturnValue(mockStudentsSelector);
      useState
        .mockReturnValueOnce([
          useStates.studentsGroup.studentsGroup,
          useStates.studentsGroup.setStudentsGroup,
        ])
        .mockReturnValueOnce([
          useStates.lesson.lesson,
          useStates.lesson.setLesson,
        ])
        .mockReturnValueOnce([
          useStates.formData.formData,
          useStates.formData.setFormData,
        ])
        .mockReturnValueOnce([
          useStates.mentor.mentor,
          useStates.mentor.setMentor,
        ]);
      useActionsFns = {
        loadLessons: jest.fn(),
        loadMentors: jest.fn(),
        loadGroups: jest.fn(),
        fetchStudents: jest.fn(),
      };
      useActions.mockReturnValue([
        useActionsFns.loadLessons,
        useActionsFns.loadMentors,
        useActionsFns.loadGroups,
        useActionsFns.fetchStudents,
      ]);
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
    });

    it('should not show loader-spinner when everything is loaded', () => {
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).not.toBeInTheDocument();
    });

    it('should show loader-spinner when lessons are loading', () => {
      mockLessonsSelector = {
        ...mockLessonsSelector,
        isLoading: true,
        isLoaded: false,
      };
      useSelector
        .mockReturnValueOnce(mockLessonsSelector)
        .mockReturnValueOnce(mockMentorsSelector)
        .mockReturnValueOnce(mockGroupsSelector)
        .mockReturnValueOnce(mockStudentsSelector);
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader-spinner when mentors are loading', () => {
      mockMentorsSelector = {
        ...mockMentorsSelector,
        isLoading: true,
        isLoaded: false,
      };
      useSelector
        .mockReturnValueOnce(mockLessonsSelector)
        .mockReturnValueOnce(mockMentorsSelector)
        .mockReturnValueOnce(mockGroupsSelector)
        .mockReturnValueOnce(mockStudentsSelector);
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader-spinner when groups are loading', () => {
      mockGroupsSelector = {
        ...mockGroupsSelector,
        isLoading: true,
        isLoaded: false,
      };
      useSelector
        .mockReturnValueOnce(mockLessonsSelector)
        .mockReturnValueOnce(mockMentorsSelector)
        .mockReturnValueOnce(mockGroupsSelector)
        .mockReturnValueOnce(mockStudentsSelector);
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should show loader-spinner when students are loading', () => {
      mockStudentsSelector = {
        ...mockStudentsSelector,
        isLoading: true,
        isLoaded: false,
      };
      useSelector
        .mockReturnValueOnce(mockLessonsSelector)
        .mockReturnValueOnce(mockMentorsSelector)
        .mockReturnValueOnce(mockGroupsSelector)
        .mockReturnValueOnce(mockStudentsSelector);
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });
  });

  describe('Tests for component content', () => {
    beforeEach(() => {
      mockLessonsSelector = {
        data: lessonsMock,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockMentorsSelector = {
        data: mentorsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      mockGroupsSelector = {
        data: groupsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      mockStudentsSelector = {
        data: studentsMock,
        isLoaded: true,
        isLoading: false,
        error: '',
      };
      useSelector
        .mockReturnValue(mockLessonsSelector)
        .mockReturnValue(mockMentorsSelector)
        .mockReturnValue(mockGroupsSelector)
        .mockReturnValue(mockStudentsSelector);
      useState
        .mockReturnValueOnce([
          useStates.studentsGroup.studentsGroup,
          useStates.studentsGroup.setStudentsGroup,
        ])
        .mockReturnValueOnce([
          useStates.lesson.lesson,
          useStates.lesson.setLesson,
        ])
        .mockReturnValueOnce([
          useStates.formData.formData,
          useStates.formData.setFormData,
        ])
        .mockReturnValueOnce([
          useStates.mentor.mentor,
          useStates.mentor.setMentor,
        ]);
      useActionsFns = {
        loadLessons: jest.fn(),
        loadMentors: jest.fn(),
        loadGroups: jest.fn(),
        fetchStudents: jest.fn(),
      };
      useActions.mockReturnValue([
        useActionsFns.loadLessons,
        useActionsFns.loadMentors,
        useActionsFns.loadGroups,
        useActionsFns.fetchStudents,
      ]);
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
    });

    it('should redirect to page 404 if lesson parameter is empty', () => {
      mockLessonsSelector = {
        ...mockLessonsSelector,
        data: [],
      };
      useSelector
        .mockReturnValueOnce(mockLessonsSelector)
        .mockReturnValueOnce(mockMentorsSelector)
        .mockReturnValueOnce(mockGroupsSelector)
        .mockReturnValueOnce(mockStudentsSelector);
      render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
    });

    it('should redirect to lessons page when click on cancel button', async () => {
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const cancelButton = container.querySelector('button.btn');

      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(historyMock.push).toHaveBeenCalledWith(paths.LESSONS);
      });
    });

    it('should redirect to students details page when click on students name', async () => {
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const studentName = container.querySelector('p');

      fireEvent.click(studentName);

      await waitFor(() => {
        expect(historyMock.push).toHaveBeenCalledWith(
          `${paths.STUDENTS_DETAILS}/1`
        );
      });
    });

    it('should render component', () => {
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      expect(container).toBeInTheDocument();
    });

    it('should render all students', () => {
      const { container } = render(
        <Router history={historyMock}>
          <LessonDetails />
        </Router>
      );
      const students = container.querySelectorAll('tr');
      expect(students.length).toBe(3);
    });
  });
});
