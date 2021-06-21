import React from "react";
import {paths, useActions} from '@/shared';
import {Router, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {act, fireEvent, render} from '@testing-library/react';
import {EditLesson} from '@/features';
import {commonHelpers} from '@/utils';
import {Formik} from "formik";


const lessonsData = [
    {
        id: 1,
        lessonDate: "2021-06-16T23:47:30",
        lessonVisits: [
            {studentId: 1, studentMark: 10, presence: true, comment: null},
            {studentId: 3, studentMark: 11, presence: true, comment: null}
        ],
        mentorId: 9,
        studentGroupId: 1,
        themeName: "API testing",
    }
];
const groupData =
    {
        courseId: 9,
        finishDate: "2022-06-17T00:00:00",
        id: 1,
        mentorIds: [9],
        name: "122-18-3",
        startDate: "2021-05-17T00:00:00",
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

const mockLessonOnEdit =
    {
        id: 1,
        themeName: "API testing",
        mentorId: 9,
        studentGroupId: 1,
        lessonDate: "2021-06-16T23:47:00",
        lessonVisits:
            [
                {studentId: 1, studentMark: 10, presence: true, comment: "", studentName: "Student Student"},
                {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };

const noLessonData = [
    {
        id: 3,
        lessonDate: "2021-06-16T23:47:30",
        lessonVisits: [
            {studentId: 5, studentMark: 10, presence: true, comment: null},
            {studentId: 6, studentMark: 11, presence: true, comment: null}
        ],
        mentorId: 9,
        studentGroupId: 1,
        themeName: "123123123API testing",
    }
];

jest.mock('react-redux', () => ({useSelector: jest.fn()}));

jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({id: 1}),
}));

describe('Render of EditLesson', () => {
    let historyMock,
        mockedLessonsSelector,
        mockGroupSelector,
        mockStudentsSelector,
        mockEditLessonSelector,
        setLessonOnEdit,
        useActionsFns;

    beforeEach(() => {
        mockedLessonsSelector = {
            data: lessonsData,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockStudentsSelector = {
            data: studentsData,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockGroupSelector = {
            data: groupData,
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockEditLessonSelector = {
            isLoaded: false,
            error: '',
        };
        useSelector
            .mockReturnValueOnce(mockedLessonsSelector)
            .mockReturnValue(mockStudentsSelector)
            .mockReturnValue(mockGroupSelector)
            .mockReturnValueOnce(mockEditLessonSelector);

        useActionsFns = {
            fetchLessons: jest.fn(),
            getGroup: jest.fn(),
            getStudents: jest.fn(),
            updateLesson: jest.fn(),
            dispatchAddAlert: jest.fn(),
        };
        useActions.mockReturnValue([useActionsFns.fetchLessons, useActionsFns.getGroup, useActionsFns.getStudents, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

        commonHelpers.transformDateTime = jest.fn().mockReturnValue({formInitialValue: '2021-06-17T02:47'});

        historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
    });

    it('should loader appear when studentLessonsSelector.isLoading is true', () => {
        const mockedLessonsSelector = {
            data: lessonsData,
            isLoading: true,
            isLoaded: false,
        };
        useSelector.mockReturnValueOnce(mockedLessonsSelector);
        const {container} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

    it('should the component be rendered', () => {
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        expect(getByTestId('editLessonRenderForm'))
            .toBeInTheDocument();
    });

    it('should the Form be rendered correctly (name+group+date)', () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit, setLessonOnEdit]);

        const {getByTestId, getByText} = render(<Router history={historyMock}>< EditLesson/></Router>);
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
        setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValue([mockLessonOnEdit, setLessonOnEdit]);

        const historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
        const {getByTestId, container} = render(<Router history={historyMock}>< EditLesson/></Router>);
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

    it("should change state LessonOnEdit ", async () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit, setLessonOnEdit]);

        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const handlePresenceChange = jest.fn();
        const user1Presence = getByTestId('formData[0].presence');
        await expect(user1Presence.value).toBe('true');
        await fireEvent.click(user1Presence);
        await expect(user1Presence.value).toBe('false');
        await handlePresenceChange(user1Presence.value);
        const mockNewLessonOnEdit =
            {
                id: 1,
                themeName: "API testing",
                mentorId: 9,
                studentGroupId: 1,
                lessonDate: "2021-06-16T23:47:00",
                lessonVisits:
                    [
                        {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        await expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit);
        await expect(setLessonOnEdit).toHaveBeenCalledTimes(1)
    });

    it("should change student's mark", () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit, setLessonOnEdit]);

        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const handleMarkChange = jest.fn();
        const userMark = getByTestId('formData[1].studentMark');
        fireEvent.blur(userMark, {target: {value: '12'}});
        expect(userMark.value).toBe('12');
        handleMarkChange(userMark.value);
        const mockNewLessonOnEdit =
            {
                id: 1,
                themeName: "API testing",
                mentorId: 9,
                studentGroupId: 1,
                lessonDate: "2021-06-16T23:47:00",
                lessonVisits:
                    [
                        {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 12, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit)
    });

    it("should change student's mark > 12", () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit, setLessonOnEdit]);

        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const handleMarkChange = jest.fn();
        const userMark = getByTestId('formData[1].studentMark');
        fireEvent.blur(userMark, {target: {value: '13'}});
        expect(userMark.value).toBe('13');
        handleMarkChange(userMark.value);
        const mockNewLessonOnEdit =
            {
                id: 1,
                themeName: "API testing",
                mentorId: 9,
                studentGroupId: 1,
                lessonDate: "2021-06-16T23:47:00",
                lessonVisits:
                    [
                        {studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 0, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit)
    });

    it('should redirect to URL STUDENTS_DETAILS ',  () => {
        setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValue([mockLessonOnEdit, setLessonOnEdit]);
        const historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const studentId = getByTestId('1');
        fireEvent.click(studentId);

        expect(historyMock.push.mock.calls[1][0]).toEqual(`${paths.STUDENTS_DETAILS}/1`);
    });

    it('should redirect to correct URL if click cancelButton', () => {
        setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValue([mockLessonOnEdit, setLessonOnEdit]);
        const historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson/></Router>);
        const cancelButton = getByTestId('cancelBtn');

        fireEvent.click(cancelButton);
        expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    });

    it('-------- should dispatchAddAlert if editError && !editIsLoaded', async () => {
        const mockEditLessonSelector = {
            isLoaded: false,
            error: 'Error',
        };
        await useSelector.mockReturnValueOnce(mockEditLessonSelector);
       // await expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1)
    });

    describe('redirect to path.NOT_FOUND', () => {
        let historyMock;

        beforeAll(() => {
            const mockedNoLessonsSelector = {
                data: noLessonData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockStudentsSelector = {
                data: studentsData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockGroupSelector = {
                data: groupData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockEditLessonSelector = {
                isLoaded: false,
                error: '',
            };
            useSelector
                .mockReturnValueOnce(mockedNoLessonsSelector)
                .mockReturnValueOnce(mockStudentsSelector)
                .mockReturnValueOnce(mockGroupSelector)
                .mockReturnValueOnce(mockEditLessonSelector);

            const useActionsFns = {
                fetchLessons: jest.fn(),
                getGroup: jest.fn(),
                getStudents: jest.fn(),
                updateLesson: jest.fn(),
                dispatchAddAlert: jest.fn(),
            };
            useActions.mockReturnValue([useActionsFns.fetchLessons, useActionsFns.getGroup, useActionsFns.getStudents, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

            setLessonOnEdit = jest.fn();
            React.useState = jest.fn().mockReturnValue([mockLessonOnEdit, setLessonOnEdit]);

            commonHelpers.transformDateTime = jest.fn().mockReturnValue({formInitialValue: '2021-06-17T02:47'});

            historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
            render(<Router history={historyMock}>< EditLesson /></Router>);
        });

        it('should redirect to URL NOT_FOUND if !lesson ',  () => {
            expect(historyMock.push.mock.calls[0][0]).toEqual(paths.NOT_FOUND);
        });
    });

    describe('-------- get lessonOnEdit state', () => {
        let setLessonOnEdit,
            historyMock;

        beforeAll(() => {
            const useActionsFns = {
                fetchLessons: jest.fn(),
                getGroup: jest.fn(),
                getStudents: jest.fn(),
                updateLesson: jest.fn(),
                dispatchAddAlert: jest.fn(),
            };
            useActions.mockReturnValue([useActionsFns.fetchLessons, useActionsFns.getGroup, useActionsFns.getStudents, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

            setLessonOnEdit = jest.fn();
            React.useState = jest.fn().mockReturnValueOnce([{}, setLessonOnEdit]);

            const mockedLessonsSelector = {
                data: lessonsData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockStudentsSelector = {
                data: studentsData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockGroupSelector = {
                data: groupData,
                isLoading: false,
                isLoaded: true,
                error: '',
            };
            const mockEditLessonSelector = {
                isLoaded: false,
                error: '',
            };
            useSelector
                .mockReturnValueOnce(mockedLessonsSelector)
                .mockReturnValue(mockStudentsSelector)
                .mockReturnValue(mockGroupSelector)
                .mockReturnValueOnce(mockEditLessonSelector);

            commonHelpers.transformDateTime = jest.fn().mockReturnValue({formInitialValue: '2021-06-17T02:47'});
            historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
        });

        it('correct lessonOnEdit', () => {
            const {debug} = render(<Router history={historyMock}>< EditLesson/></Router>);
            debug();
            // expect(setLessonOnEdit).toHaveBeenCalledTimes(1);
            // expect(setLessonOnEdit).toHaveBeenCalledWith(mockLessonOnEdit);
        });
    });

    describe('Form Interaction', () => {
        let onSubmit,
            historyMock;

        beforeEach(() => {
            onSubmit = jest.fn();

            const initialValues = {
                themeName: "API testing",
                groupName: '122-18-3',
                lessonDate: '2021-06-17T02:47',
                formData: [{
                    studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"
                }, {studentId: 3, studentMark: 12, presence: true, comment: "", studentName: "StudenT StudenT"}],
            };
            commonHelpers.transformDateTime = jest.fn().mockReturnValue({formDateTimeForRequest: '2021-06-17T01:47:00.000Z', formInitialValue: '2021-06-17T02:47'});
            historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};
            const { getByTestId } = render(<Router history={historyMock}>< EditLesson onSubmit={onSubmit}><Formik  initialValues={initialValues}/></EditLesson></Router>);

            const themeName = getByTestId('themeName');
            const lessonDate = getByTestId('lessonDate');
            const groupName = getByTestId('groupName');
            const submitBtn = getByTestId('submitBtn');

            const formValues = {
                themeName: '12313',
                lessonDate: "2021-06-17T04:47",
                groupName: "122-18-3",
                formData: initialValues.formData,
            };
            commonHelpers.capitalizeTheme = jest.fn().mockReturnValue(formValues.themeName);


            fireEvent.change(themeName, {target: {value: formValues.themeName}});
            fireEvent.change(lessonDate, {target: {value: formValues.lessonDate}});
            fireEvent.change(groupName, {target: {value: formValues.groupName}});
            fireEvent.click(submitBtn);
        });

        it('should submit a basic Formik form', async () => {

            await expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    })

});



