import React from "react";
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { EditLesson } from '@/features';
import { commonHelpers } from '@/utils';
import {loadStudentGroupsSelector, studentsSelector} from "@/models";

const lessonData =
    {
        comment: null,
        id: 1,
        lessonDate: '2021-06-16T23:47:00',
        mark: 10,
        presence: true,
        studentGroupId: 1,
        themeName: 'API testing',
    };
const groupData =
    {
        courseId: 9,
        finishDate: "2022-06-16T00:00:00",
        id: 1,
        mentorIds: [9],
        name: "122-18-3",
        startDate: "2021-05-16T00:00:00",
        studentIds: [1, 3]
    };

const studentsData = [
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

describe('Render of EditLesson', () => {
    let historyMock;

    beforeEach(() => {
        const mockedLessonSelector = {
            data: lessonData,
            isLoading: false,
            isLoaded: true,
        };
        const mockGroupsSelector = {
           data: groupData,
           isLoading: false,
           isLoaded: true,
        };
        const mockStudentsSelector = {
            data: studentsData,
            isLoading: false,
            isLoaded: true,
        };
        // const mockEditLessonSelector = {
        //     isLoaded: false,
        //     error: '',
        // };
        const useActionsFns = {
            getGroups: jest.fn(),
            getStudents: jest.fn(),
            loadLessons: jest.fn(),
            updateLesson: jest.fn(),
            dispatchAddAlert: jest.fn(),
        };
        useSelector
            .mockReturnValueOnce(mockGroupsSelector)
            .mockReturnValueOnce(mockStudentsSelector)
            .mockReturnValueOnce(mockedLessonSelector)
            // .mockReturnValueOnce(mockEditLessonSelector);

        useActions.mockReturnValue([useActionsFns.getGroups, useActionsFns.getStudents, useActionsFns.loadLessons, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

        const useStateLessonData = {
            lessonData: '',
            setLessonData: jest.fn(),
        };
        React.useState = jest.fn()
            .mockReturnValueOnce([useStateLessonData.lessonData, useStateLessonData.setLessonData]);
        commonHelpers.transformDateTime = jest.fn().mockReturnValue('2021-06-16T23:47:00.000Z');

        historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    });

    it('should redirect to URL NOT_FOUND if !lesson',  () => {
        const mockedLessonSelector = {
            data: {},
            isLoading: false,
            isLoaded: true,
        };
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
         useSelector.mockReturnValueOnce(mockedLessonSelector);

         render(<Router history={historyMock}>< EditLesson /></Router>);

         expect(historyMock.push.mock.calls[0][0])
            .toEqual(paths.NOT_FOUND);
    });

    it('should redirect to URL LESSONS if !editError && editIsLoaded',  () => {
        const mockEditLessonSelector = {
            isLoaded: true,
            error: '',
        };
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        useSelector.mockReturnValueOnce(mockEditLessonSelector);

        render(<Router history={historyMock}>< EditLesson /></Router>);

        expect(historyMock.push.mock.calls[0][0])
            .toEqual(paths.LESSONS);
    });

    it('should redirect to URL LESSONS when click cancel btn',  () => {
        // const mockEditLessonSelector = {
        //     isLoaded: true,
        //     error: '',
        // };
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        // useSelector.mockReturnValueOnce(mockEditLessonSelector);
        const { getByTestId } = render(<Router history={historyMock}>< EditLesson /></Router>);
        const cancelButton = getByTestId('cancelBtn');
        fireEvent.click(cancelButton);

        expect(historyMock.push.mock.calls[0][0])
            .toEqual(paths.LESSONS);
        // render(<Router history={historyMock}>< EditLesson /></Router>);

        // expect(historyMock.push.mock.calls[0][0])
        //     .toEqual(paths.LESSONS);
    });

    // it('should redirect to correct URL if !editError && editIsLoaded', async () => {
    //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    //     const mockEditLessonSelector = {
    //         isLoaded: true,
    //         error: '',
    //     };
    //     const { getByTestId } = render(<Router history={historyMock}>< EditLesson /></Router>);
    //     const backButton = getByTestId('backButton');
    //     fireEvent.click(backButton);
    //
    //     expect(historyMock.push.mock.calls[0][0])
    //         .toEqual(paths.LESSONS);
    // });

    it('should the component be rendered', () => {
        const {getByTestId} = render(<EditLesson/>);
        expect(getByTestId('lessonsList'))
            .toBeInTheDocument();
    });

    it('should loader appear when studentLessonsSelector.isLoading is true', () => {
        const mockedLessonsSelector = {
            data: lessonsData,
            isLoading: true,
            isLoaded: false,
        };
        useSelector.mockReturnValue(mockedLessonsSelector);
        const {container} = render(< EditLesson />);
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });


});
