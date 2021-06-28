import React from 'react';
import {paths, useActions} from '@/shared';
import {Router} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {AddLesson, EditCourse} from '@/features';
// import { commonHelpers } from '@/utils';
import {editCourseMock} from './mocks/mock-data.js';
// import { useStates, useStateMock } from './mocks/mock-useState';
// import {deletedCourseSelector, editedCourseSelector} from "@/models";

jest.mock('react-redux', () => ({useSelector: jest.fn()}));

jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

describe('EditLesson tests', () => {
    let historyMock;
    let data;
    let mockEditedCourseSelector;
    let mockDeletedCourseSelector;
    let useActionsFns;

    beforeEach(() => {

        data = editCourseMock;
        data.isLoading = false;

        mockEditedCourseSelector = {
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockDeletedCourseSelector = {
            isLoading: false,
            isLoaded: true,
            error: '',
        };

        useSelector
            .mockReturnValue(mockEditedCourseSelector)
            .mockReturnValue(mockDeletedCourseSelector);

        useActionsFns = {updateCourse: jest.fn(), dispatchAddAlert: jest.fn(), removeCourse: jest.fn()};
        useActions.mockReturnValue([useActionsFns.updateCourse, useActionsFns.dispatchAddAlert, useActionsFns.removeCourse]);

        historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
    });

    it('Loader appears when isLoading in data is true', () => {
        data.isLoading = true;

        const { container } = render(
            <Router history={historyMock}>
                <EditCourse coursesData={data} id={1}/>
            </Router>
        );
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

    it('should the component be rendered', () => {
        const { getByTestId } = render(
            <Router history={historyMock} >
                <EditCourse coursesData={data} id={1}/>
            </Router>
        );
        const form = getByTestId('editCourseForm');
        expect(form).toBeInTheDocument();
    });

    // it('should be redirected to path LESSONS when cancelBtn is clicked', () => {
    //     const { getByTestId } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const cancelBtn = getByTestId('cancelBtn');
    //     fireEvent.click(cancelBtn);
    //     expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    // });
    //
    // it('should redirect to URL LESSONS when !addError && addIsLoaded', () => {
    //     mockEditLessonSelector = {
    //         isLoaded: true,
    //         isLoading: false,
    //         error: '',
    //     };
    //     useSelector.mockReturnValueOnce(mockEditLessonSelector);
    //     render(<Router history={historyMock}><AddLesson /></Router>);
    //     expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    // });
    //
    // it('should datalist of groups = 2', () => {
    //     const { container } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const groupList = container.querySelector('#group-list');
    //     expect(groupList.children.length).toEqual(2);
    // });
    //
    // it('should datalist of mentors emails = 1', () => {
    //     const { container } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const mentorList = container.querySelector('#mentor-list');
    //     expect(mentorList.children.length).toEqual(1);
    // });
    //
    // it('should mentor email be chosen', () => {
    //     React.useState = useStateMock.default;
    //     const { container } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const mentorEmail = container.querySelector('#mentorEmail');
    //     fireEvent.change(mentorEmail, { target: { value: mentorsMock[0].email } });
    //     const mentorError = container.querySelector('#mentor-error');
    //     expect(mentorError).not.toBeInTheDocument(); // mentorError === false
    // });
    //
    // it('should set State formData', async () => {
    //     React.useState = useStateMock.setFormData;
    //     const { container } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const openClassRegister = jest.fn();
    //     const getFormData = jest.fn();
    //     const inputLessonTheme = container.querySelector('#inputLessonTheme');
    //     const inputDateTime = container.querySelector('#choose-date-time');
    //     const inputGroupName = container.querySelector('#inputGroupName');
    //     const mentorEmail = container.querySelector('#mentorEmail');
    //
    //     await waitFor(() => {
    //         fireEvent.change(inputLessonTheme, { target: { value: 'New lesson' } });
    //         fireEvent.change(inputGroupName, { target: { value: groupsMock[0].name } });
    //         fireEvent.change(inputDateTime, { target: { value: '2021-06-21T12:41' } });
    //         fireEvent.change(mentorEmail, { target: { value: mentorsMock[0].email } });
    //     });
    //     const classRegBtn = container.querySelector('#class-register-btn');
    //     await waitFor(() => fireEvent.click(classRegBtn));
    //     await openClassRegister();
    //     await getFormData();
    //     expect(inputLessonTheme.value).toBe('New lesson');
    //     expect(inputGroupName.value).toBe(groupsMock[0].name);
    //     expect(inputDateTime.value).toBe('2021-06-21T12:41');
    //     expect(mentorEmail.value).toBe(mentorsMock[0].email);
    //     expect(useStates.formData.setFormData).toHaveBeenCalledWith(formData.default);
    //     expect(useStates.classRegister.setClassRegister).toHaveBeenCalledWith(true);
    // });
    //
    // it('should change present state in formData  && redirect to path STUDENTS_DETAILS', async () => {
    //     React.useState = useStateMock.renderFormData;
    //     const { getByTestId } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const handlePresenceChange = jest.fn();
    //
    //     // Change present state in formData
    //     const user1Presence = getByTestId('formData[0].presence');
    //     await expect(user1Presence.value).toBe('false');
    //     await waitFor(() => fireEvent.click(user1Presence));
    //     const formDataMock = [
    //         { studentId: 1, studentMark: 0, presence: true, comment: '', studentName: 'Student Student' },
    //         { studentId: 3, studentMark: 0, presence: false, comment: '', studentName: 'StudenT StudenT' }];
    //     await handlePresenceChange(user1Presence.value);
    //     await expect(user1Presence.value).toBe('true');
    //     await expect(useStates.formData.setFormData).toHaveBeenCalledWith(formDataMock);
    //
    //     // redirect to path STUDENTS_DETAILS
    //     const studentForm = getByTestId('students-formData-table');
    //     const studentName = getByTestId('openStudentDetails-1');
    //     expect(studentForm).toBeInTheDocument();
    //     expect(studentForm.children.length).toBe(2); // amount of students
    //     await waitFor(() => fireEvent.click(studentName));
    //     expect(historyMock.push.mock.calls[0][0]).toEqual(`${paths.STUDENTS_DETAILS}/1`);
    // });
    //
    // it('should change mark state in formData ', async () => {
    //     React.useState = useStateMock.changeMark;
    //     const { getByTestId } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const handleMarkChange = jest.fn();
    //     const user1Mark = getByTestId('formData[0].studentMark');
    //     const user2Mark = getByTestId('formData[1].studentMark');
    //     await expect(user2Mark.value).toBe('0');
    //     await expect(user1Mark.value).toBe('0');
    //     await waitFor(() => {
    //         fireEvent.change(user1Mark, { target: { value: 10 } });
    //         fireEvent.change(user2Mark, { target: { value: 13 } });
    //     });
    //     const formDataMock = [
    //         { studentId: 1, studentMark: 10, presence: true, comment: '', studentName: 'Student Student' },
    //         { studentId: 3, studentMark: 0, presence: true, comment: '', studentName: 'StudenT StudenT' }];
    //     await handleMarkChange(user1Mark.value);
    //     await handleMarkChange(user2Mark.value);
    //     await expect(user1Mark.value).toBe(user1Mark.value);
    //     await expect(user2Mark.value).toBe('0');
    //     await expect(useStates.formData.setFormData).toHaveBeenCalledWith(formDataMock);
    //     await expect(useStates.markError.setMarkError).toHaveBeenCalledWith(true);
    // });
    //
    // it('submit Form', async () => {
    //     React.useState = useStateMock.submit;
    //     commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formDateTimeForRequest: '2021-06-21T19:53:00.000Z' });
    //
    //     const { container } = render(<Router history={historyMock}><AddLesson /></Router>);
    //     const inputLessonTheme = container.querySelector('#inputLessonTheme');
    //     const inputDateTime = container.querySelector('#choose-date-time');
    //     const inputGroupName = container.querySelector('#inputGroupName');
    //     const mentorEmail = container.querySelector('#mentorEmail');
    //     const submitBtn = container.querySelector('#submit');
    //     const onSubmit = jest.fn();
    //
    //     const formValues = {
    //         themeName: 'New lesson',
    //         lessonDate: '2021-06-21T22:53',
    //     };
    //     expect(submitBtn).toBeInTheDocument();
    //     await waitFor(() => {
    //         fireEvent.change(inputLessonTheme, { target: { value: formValues.themeName } });
    //         fireEvent.change(inputGroupName, { target: { value: groupsMock[0].name } });
    //         fireEvent.change(inputDateTime, { target: { value: formValues.lessonDate } });
    //         fireEvent.change(mentorEmail, { target: { value: mentorsMock[0].email } });
    //     });
    //     await waitFor(() => {
    //         fireEvent.click(submitBtn);
    //         onSubmit();
    //     });
    //     expect(onSubmit).toHaveBeenCalled();
    //     expect(useActionsFns.createLesson).toHaveBeenCalledTimes(1);
    // });
});