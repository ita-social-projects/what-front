import React from "react";
import {paths, useActions} from '@/shared';
import {Router, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {act, fireEvent, render} from '@testing-library/react';
import { AddLesson } from '@/features';
import {commonHelpers} from '@/utils';

const groupsMock= [
    {
        courseId: 9,
        finishDate: "2022-06-16T00:00:00",
        id: 1,
        mentorIds: [9],
        name: "122-18-3",
        startDate: "2021-05-16T00:00:00",
        studentIds: [1, 3]
    },
    {
        courseId: 1,
        finishDate: "2022-06-16T00:00:00",
        id: 2,
        mentorIds: [1],
        name: "122-18-2",
        startDate: "2021-04-16T00:00:00",
        studentIds: [2, 11, 12, 13, 16, 33, 42, 43, 44, 46]
    }
];
const mentorsMock = [
    {
        avatarUrl: null,
        email: "alexiscahn40@what_WH.at",
        firstName: "MeurigMent",
        id: 9,
        lastName: "MeurigMento"
    }
];

const studentsMock = [
    {
        avatarUrl: null,
        email: "student@gmail.com",
        firstName: "student",
        id: 1,
        lastName: "student",
    },
    {
        avatarUrl: null,
        email: "StudenT01@gmail.com",
        firstName: "StudenT",
        id: 3,
        lastName: "StudenT",
    }
];

jest.mock('react-redux', () => ({useSelector: jest.fn()}));

jest.mock('react', () => ({useEffect: jest.fn()}));

jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({id: 1}),
}));

describe('Render of EditLesson', () => {
    let historyMock,
        mockStudentsSelector,
        mockGroupsSelector,
        mockMentorsSelector,
        mockEditLessonSelector,
        setLessonOnEdit,
        useActionsFns;

    beforeEach(() => {

        mockStudentsSelector = {
            data: studentsMock,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockGroupsSelector = {
            data: groupsMock,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockMentorsSelector = {
            data: mentorsMock,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockEditLessonSelector = {
            isLoaded: false,
            isLoading: false,
            error: '',
        };
        // useSelector
        //     .mockReturnValueOnce(mockMentorsSelector)
        //     .mockReturnValueOnce(mockGroupsSelector)
        //     .mockReturnValueOnce(mockStudentsSelector)
        //     .mockReturnValue(mockEditLessonSelector);

        useActionsFns = {
            getMentors: jest.fn(),
            getGroups: jest.fn(),
            getStudents: jest.fn(),
            createLesson: jest.fn(),
            dispatchAddAlert: jest.fn(),
        };
        useActions.mockReturnValue([useActionsFns.getMentors, useActionsFns.getGroups, useActionsFns.getStudents, useActionsFns.createLesson, useActionsFns.dispatchAddAlert]);

        commonHelpers.transformDateTime = jest.fn().mockReturnValue({formDateTimeForRequest: '2021-06-17T01:47:00.000Z', formInitialValue: '2021-06-17T02:47'});

        historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
    });

    it('should loader appear when mentorsIsLoading is false', () => {
        mockMentorsSelector = {
            isLoading: true,
        };
        useSelector.mockReturnValue(mockMentorsSelector);
        const { container } = render(<Router history={historyMock}>< AddLesson/></Router>);
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

    it('should the component be rendered', () => {
        const { getByTestId, debug } = render(<Router history={historyMock}>< AddLesson/></Router>);
        debug();
        expect(getByTestId('addForm')).toBeInTheDocument();
    });

    it('should be redirected to path LESSONS when cancelBtn is clicked', () => {
        const { getByTestId } = render(<Router history={historyMock}>< AddLesson/></Router>);
        const cancelBtn = getByTestId('cancelBtn');
        fireEvent.click(cancelBtn);
        expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS)
    });

    it('should redirect to URL LESSONS when !addError && addIsLoaded',  () => {
        mockEditLessonSelector = {
            isLoaded: true,
            isLoading: false,
            error: '',
        };
        useSelector.mockReturnValueOnce(mockEditLessonSelector);
        render(<Router history={historyMock}>< AddLesson/></Router>);
        expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    });

    it('should datalist of groups = 2', () => {
        const { container } = render(<Router history={historyMock}>< AddLesson/></Router>);
        const groupList = container.querySelector('#group-list');
        expect(groupList.children.length).toEqual(2);
    });

    it('should datalist of mentors emails = 1', () => {
        const { container } = render(<Router history={historyMock}>< AddLesson/></Router>);
        const mentorList = container.querySelector('#mentor-list');
        expect(mentorList.children.length).toEqual(1);
    });

    it('should dispatch getMentors, getGroups(), getStudents()', () => {
        mockStudentsSelector = {
            isLoaded: false,
            error: '',
        };
        mockGroupsSelector = {
            isLoaded: false,
            error: '',
        };
        mockMentorsSelector = {
            isLoaded: false,
            error: '',
        };
        useSelector
            .mockReturnValueOnce(mockMentorsSelector)
            .mockReturnValueOnce(mockGroupsSelector)
            .mockReturnValueOnce(mockStudentsSelector);
        useActionsFns.getMentors();
        useActionsFns.getGroups();
        useActionsFns.getStudents();
        expect(useActionsFns.getMentors).toHaveBeenCalledTimes(1);
        expect(useActionsFns.getGroups).toHaveBeenCalledTimes(1);
        expect(useActionsFns.getStudents).toHaveBeenCalledTimes(1);
    });

    it('should dispatch dispatchAddAlert if addError', () => {
        mockEditLessonSelector = {
            isLoaded: false,
            error: 'Error',
        };
        useSelector.mockReturnValueOnce(mockEditLessonSelector);
        useActionsFns.dispatchAddAlert();
        expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1);
    });
    // it('--later-- should redirect to URL STUDENTS_DETAILS/1 on the click',  () => {
    //     const { getByTestId, debug } = render(<Router history={historyMock}>< AddLesson/></Router>);
    //     debug();
    //     const openStudentDetails = jest.fn();
    //     const studentDetailButton = getByTestId('openStudentDetails');
    //     fireEvent.click(studentDetailButton);
    //     expect(openStudentDetails).toHaveBeenCalledTimes(1);
    //     expect(openStudentDetails).toHaveBeenCalledWith(1);
    //     expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    // });


});
