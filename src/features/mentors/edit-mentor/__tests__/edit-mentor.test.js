import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { EditMentor } from '@/features';
import {
  groupsMock,
  mentorsMock,
  coursesMock,
  allGroupsMock,
  allCoursesMock,
  submitForm
} from './mocks/mockedData';
import { useStates, useStateMock } from './mocks/mockedState';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

describe('EditMentor Tests', () => {
  let historyMock;
  let mockMentorIdSelector;
  let mockMentorGroupsSelector;
  let mockMentorCoursesSelector;
  let mockStudentGroupsSelector;
  let mockCoursesSelector;
  let mockMentorEditingSelector;
  let mockMentorDeletingSelector;
  let useActionsFns;
  let id;

  describe('loaders', () => {
    beforeEach(() => {
      mockMentorIdSelector = {
        data: mentorsMock,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockMentorGroupsSelector = {
        data: groupsMock,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockMentorCoursesSelector = {
        data: coursesMock,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockStudentGroupsSelector = {
        data: allGroupsMock,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockCoursesSelector = {
        data: allCoursesMock,
        isLoading: false,
        loaded: true,
        error: '',
      };
      mockMentorEditingSelector = {
        isLoaded: false,
        isLoading: false,
        error: '',
      };
      mockMentorDeletingSelector = {
        isLoaded: false,
        isLoading: false,
        error: '',
      };
      useSelector
        .mockReturnValue(mockMentorIdSelector)
        .mockReturnValue(mockMentorGroupsSelector)
        .mockReturnValue(mockMentorCoursesSelector)
        .mockReturnValue(mockStudentGroupsSelector)
        .mockReturnValue(mockCoursesSelector)
        .mockReturnValue(mockMentorEditingSelector)
        .mockReturnValue(mockMentorDeletingSelector);
      useActionsFns = {
        dispatchMentorById: jest.fn(),
        updateMentor: jest.fn(),
        removeMentor: jest.fn(),
        dispatchAddAlert: jest.fn(),
        loadCourses: jest.fn(),
        fetchListOfGroups: jest.fn(),
      };
      useActions.mockReturnValue(
        [
          useActionsFns.dispatchMentorById,
          useActionsFns.updateMentor,
          useActionsFns.removeMentor,
          useActionsFns.dispatchAddAlert,
          useActionsFns.loadCourses,
          useActionsFns.fetchListOfGroups]);
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
      };
    });

    it('should loader appear when mentorEditIsLoading is true', () => {
      mockMentorIdSelector = {
        isLoading: true,
        isLoaded: false,
      };
      useSelector.mockReturnValueOnce(mockMentorIdSelector);
      const { container } = render(<Router history={historyMock}><EditMentor/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader)
        .toBeInTheDocument();
    });

    it('should loader appear when MentorGroupsSelector is true', () => {
      mockMentorGroupsSelector = {
        isLoading: true,
        isLoaded: false,
      };
      useSelector.mockReturnValueOnce(mockMentorGroupsSelector);
      const { container } = render(<Router history={historyMock}><EditMentor/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader)
        .toBeInTheDocument();
    });

    it('should loader appear when MentorCoursesSelector is true', () => {
      mockMentorCoursesSelector = {
        isLoading: true,
        isLoaded: false,
      };
      useSelector.mockReturnValueOnce(mockMentorCoursesSelector);
      const { container } = render(<Router history={historyMock}><EditMentor/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader)
        .toBeInTheDocument();
    });

    it('should loader appear when StudentGroupsSelector is true', () => {
      mockStudentGroupsSelector = {
        isLoading: true,
        isLoaded: false,
      };
      useSelector.mockReturnValueOnce(mockStudentGroupsSelector);
      const { container } = render(<Router history={historyMock}><EditMentor/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader)
        .toBeInTheDocument();
    });

    it('should loader appear when CoursesSelector is true', () => {
      mockCoursesSelector = {
        isLoading: true,
        loaded: false,
      };
      useSelector.mockReturnValueOnce(mockCoursesSelector);
      const { container } = render(<Router history={historyMock}><EditMentor/></Router>);
      const loader = container.querySelector('.spinner-border');
      expect(loader)
        .toBeInTheDocument();
    });
  });

  describe('content', () => {
  beforeEach(() => {
    mockMentorIdSelector = {
      data: mentorsMock,
      isLoading: false,
      isLoaded: true,
      error: '',
    };
    mockMentorGroupsSelector = {
      data: groupsMock,
      isLoading: false,
      isLoaded: true,
      error: '',
    };
    mockMentorCoursesSelector = {
      data: coursesMock,
      isLoading: false,
      isLoaded: true,
      error: '',
    };
    mockStudentGroupsSelector = {
      data: allGroupsMock,
      isLoading: false,
      isLoaded: true,
      error: '',
    };
    mockCoursesSelector = {
      data: allCoursesMock,
      isLoading: false,
      loaded: true,
      error: '',
    };
    mockMentorEditingSelector = {
      isLoaded: false,
      isLoading: false,
      error: '',
    };
    mockMentorDeletingSelector = {
      isLoaded: false,
      isLoading: false,
      error: '',
    };
    useSelector
      .mockReturnValueOnce(mockMentorIdSelector)
      .mockReturnValueOnce(mockMentorGroupsSelector)
      .mockReturnValueOnce(mockMentorCoursesSelector)
      .mockReturnValueOnce(mockStudentGroupsSelector)
      .mockReturnValueOnce(mockCoursesSelector)
      .mockReturnValue(mockMentorEditingSelector)
      .mockReturnValue(mockMentorDeletingSelector);

    useActionsFns = {
      dispatchMentorById: jest.fn(),
      updateMentor: jest.fn(),
      removeMentor: jest.fn(),
      dispatchAddAlert: jest.fn(),
      loadCourses: jest.fn(),
      fetchListOfGroups: jest.fn(),
    };
    useActions.mockReturnValue(
      [
        useActionsFns.dispatchMentorById,
        useActionsFns.updateMentor,
        useActionsFns.removeMentor,
        useActionsFns.dispatchAddAlert,
        useActionsFns.loadCourses,
        useActionsFns.fetchListOfGroups]);

    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    id = 4;
  });

  it('should the component be rendered', () => {
    const { getByTestId } = render(<Router history={historyMock}><EditMentor id={id}  /></Router>);
    expect(getByTestId("editForm")).toBeInTheDocument();
  });

  it('should datalist of groups = 3', () => {
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const groupList = container.querySelector('#group-list');
    expect(groupList.children.length).toEqual(3);
  });

  it('should list of mentorGroups = 2', () => {
    const { getByTestId } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const groupList = getByTestId('li-groups');
    expect(groupList.children.length).toEqual(2);
  });

  it('should datalist of courses = 3', () => {
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const groupList = container.querySelector('#course-list');
    expect(groupList.children.length).toEqual(3);
  });

  it('should list of mentorCourses = 2', () => {
    const { getByTestId } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const courseList = getByTestId('li-courses');
    expect(courseList.children.length).toEqual(2);
  });

  it('should mentor group be chosen', () => {
    React.useState = useStateMock.default;
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const mentorGroup = container.querySelector('#groupsInput');
    fireEvent.change(mentorGroup, { target: { value: allGroupsMock[0].name } });
    const groupError = container.querySelector('#group-error');
    expect(groupError).not.toBeInTheDocument(); // groupError === false
  });

  it('should mentor course be chosen', () => {
    React.useState = useStateMock.default;
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const mentorCourse = container.querySelector('#coursesInput');
    fireEvent.change(mentorCourse, { target: { value: allCoursesMock[0].name } });
    const courseError = container.querySelector('#course-error');
    expect(courseError).not.toBeInTheDocument(); // courseError === false
  });

  it('should delete group from list of chosen', async () => {
    React.useState = useStateMock.setGroupDelete;
    const { container, getByTestId } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const handleGroupDelete = jest.fn();
    const checkEquality = jest.fn();
    const deleteBtn = container.querySelector('.delGroup')
    const groupValue = getByTestId(27);
    expect(groupValue).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(deleteBtn);
      handleGroupDelete(groupValue);
      checkEquality();
    });
    expect(handleGroupDelete).toHaveBeenCalled();
    expect(checkEquality).toHaveBeenCalled();
    expect(useStates.groups.setGroups).toHaveBeenCalled();
  });

  it('should delete course from list of chosen', async () => {
    React.useState = useStateMock.setCourseDelete;
    const { container, getByTestId } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const handleCourseDelete = jest.fn();
    const checkEquality = jest.fn();
    const deleteBtn = container.querySelector('.delCourse')
    const courseValue = getByTestId(4);
    expect(courseValue).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(deleteBtn);
      handleCourseDelete(courseValue);
      checkEquality();
    });
    expect(handleCourseDelete).toHaveBeenCalled();
    expect(checkEquality).toHaveBeenCalled();
    expect(useStates.courses.setCourses).toHaveBeenCalled();
  });

  it('should modalWindow ', async () => {
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const handleShowModal = jest.fn();
    const disableBtn = container.querySelector('.disableBtn');
    await waitFor(() => {
      fireEvent.click(disableBtn);
      handleShowModal();
    });
    expect(handleShowModal).toHaveBeenCalledTimes(1);
  });

  it('should clear picked groups or courses', async () => {
    React.useState = useStateMock.setGroupAdd;
    const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
    const resetInput = jest.fn();
    const resetBtn = container.querySelector('#resetBtn');
    await waitFor(()=> {
      fireEvent.click(resetBtn);
      resetInput();
    });
    expect(resetInput).toHaveBeenCalledTimes(1);
    expect(useStates.groups.setGroups).toHaveBeenCalled();
    expect(useStates.courses.setCourses).toHaveBeenCalled();
  });

    it('should groupInput changed', async () => {
      const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
      const handleGroupInputChange = jest.fn();
      const groupInput = container.querySelector('#groupsInput');
      await waitFor(() => {
        fireEvent.change(groupInput, { target: { value: allGroupsMock[1].name } });
        handleGroupInputChange();
      });
      expect(handleGroupInputChange).toHaveBeenCalled();
      await expect(groupInput.value).toBe(allGroupsMock[1].name);
    });

    it('should courseInput changed', async () => {
      const { container } = render(<Router history={historyMock}><EditMentor id={id} /></Router>);
      const handleCourseInputChange = jest.fn();
      const courseInput = container.querySelector('#coursesInput');
      await waitFor(() => {
        fireEvent.change(courseInput, { target: { value: allCoursesMock[1].name } });
        handleCourseInputChange();
      });
      expect(handleCourseInputChange).toHaveBeenCalled();
      await expect(courseInput.value).toBe(allCoursesMock[1].name);
    });

  it('should add group in list', async () => {
    React.useState = useStateMock.setGroupAdd;
    const { container } = render(<Router history={historyMock}><EditMentor id={id} id={id}/></Router>);
    const handleGroupAdd = jest.fn();
    const checkEquality = jest.fn();
    const addGroupBtn = container.querySelector('#addGroup');
    const inputGroup = container.querySelector('#groupsInput');
    await waitFor(() => {
      fireEvent.change(inputGroup, { target: { value: allGroupsMock[0].name } });
    });
    await waitFor(() => fireEvent.click(addGroupBtn));
    await handleGroupAdd();
    await checkEquality();
    expect(inputGroup.value).toBe(allGroupsMock[0].name);
    expect(useStates.groups.setGroups).toHaveBeenCalled();
  });

  it('should add course in list', async () => {
    React.useState = useStateMock.setCourseAdd;
    const { container } = render(<Router history={historyMock}><EditMentor id={id} id={id}/></Router>);
    const handleCourseAdd = jest.fn();
    const checkEquality = jest.fn();
    const addCourseBtn = container.querySelector('#addCourse');
    const inputCourse = container.querySelector('#coursesInput');
    await waitFor(() => {
      fireEvent.change(inputCourse, { target: { value: allCoursesMock[0].name } });
    });
    await waitFor(() => fireEvent.click(addCourseBtn));
    await handleCourseAdd();
    await checkEquality();
    expect(inputCourse.value).toBe(allCoursesMock[0].name);
    expect(useStates.courses.setCourses).toHaveBeenCalled();
  });

  it('should submit Form', async () => {
    React.useState = useStateMock.setSubmit;

    const { container } = render(<Router history={historyMock}><EditMentor id={id}/></Router>);
    const inputFirstName = container.querySelector('#firstName');
    const inputLastName = container.querySelector('#lastName');
    const inputEmail = container.querySelector('#email');

    const submitBtn = container.querySelector('.submit');
    const onSubmit = jest.fn();
    const validateEditMentor = jest.fn();

    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(inputFirstName, { target: { value: submitForm.mentorFirst } });
      fireEvent.change(inputLastName, { target: { value: submitForm.mentorLast } });
      fireEvent.change(inputEmail, { target: { value: submitForm.mentorEmail } });
    });
    await waitFor(() => {
      fireEvent.click(submitBtn);
      onSubmit();
      validateEditMentor();
    });
     expect(onSubmit).toHaveBeenCalled();
     expect(validateEditMentor).toHaveBeenCalledTimes(1);
  });
});
});