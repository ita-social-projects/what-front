import React from "react";
import {paths, useActions} from '@/shared';
import {Router, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {act, fireEvent, render} from '@testing-library/react';
import {EditLesson} from '@/features';
import {commonHelpers} from '@/utils';

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
       { studentId: 1, studentMark: 10, presence: true, comment: "", studentName: "Student Student"},
       {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
    };
//     [
//     {
//         comment: "",
//         presence: true,
//         studentId: 3,
//         studentMark: 5,
//         studentName: "Student Student",
//     },
//     {
//         comment: "",
//         presence: true,
//         studentId: 3,
//         studentMark: 4,
//         studentName: "StudenT StudenT",
//     }
// ];

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

describe('Render of EditLesson', () => {
    let historyMock,
        mockedLessonsSelector,
        mockGroupSelector,
        mockStudentsSelector,
        mockEditLessonSelector,
        setLessonOnEdit;

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

        const useActionsFns = {
            fetchLessons: jest.fn(),
            getGroup: jest.fn(),
            getStudents: jest.fn(),
            updateLesson: jest.fn(),
            dispatchAddAlert: jest.fn(),
        };
        useActions.mockReturnValue([useActionsFns.fetchLessons, useActionsFns.getGroup, useActionsFns.getStudents, useActionsFns.updateLesson, useActionsFns.dispatchAddAlert]);

        setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValue([mockLessonOnEdit,setLessonOnEdit]);

        commonHelpers.transformDateTime = jest.fn().mockReturnValue({ formInitialValue:'2021-06-17T02:47' });

        historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    });

    it('should loader appear when lessonsIsLoading is true', () => {
        const mockedLessonsSelector = {
            data: lessonsData,
            isLoading: true,
            isLoaded: false,
        };
        useSelector
            .mockReturnValueOnce(mockedLessonsSelector)
            .mockReturnValue(mockGroupSelector)
            .mockReturnValue(mockStudentsSelector);
        const { container } = render(<Router history={historyMock}>< EditLesson /></Router>);
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

    it('should loader appear when studentLessonsSelector.isLoading is true', () => {
        const mockedLessonsSelector = {
            data: lessonsData,
            isLoading: true,
            isLoaded: false,
        };
        useSelector.mockReturnValueOnce(mockedLessonsSelector);
        const {container} = render(<Router history={historyMock}>< EditLesson /></Router>);
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

//     it('should be get lessonOnEdit state', () => {
//         const setLessonOnEdit = jest.fn();
//         // React.useState = jest.fn().mockReturnValueOnce([{},setLessonOnEdit]);
//         mockedLessonsSelector = {
//             data: lessonsData,
//             isLoading: false,
//             isLoaded: true,
//         };
//         mockStudentsSelector = {
//             data: studentsData,
//             isLoading: false,
//             isLoaded: true,
//         };
//         useSelector
//             .mockReturnValueOnce(mockedLessonsSelector)
//             .mockReturnValue(mockStudentsSelector)
//             .mockReturnValue(mockGroupSelector);
// // const data = lessonsData.find(el => el.id === 1);
// expect(lessonsData.some(el => el.id === 1)).toBe(true);
//         // expect(setLessonOnEdit).toHaveBeenCalledWith(data)
//     });

    it('should the component be rendered', () => {
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson /></Router>);
        expect(getByTestId('editLessonRenderForm'))
            .toBeInTheDocument();
    });


    it('should the Form be rendered ....', () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit,setLessonOnEdit]);

        const {getByTestId, getByText} = render(<Router history={historyMock}>< EditLesson /></Router>);
            const themeName = getByTestId('themeName');
            const student1 = getByText('StudenT StudenT');

            const groupName = getByTestId('groupName');
            const lessonDate = getByTestId('lessonDate');
            expect(getByTestId('editForm')).toBeInTheDocument();
            expect(themeName.value).toBe('API testing');
            expect(groupName.value).toBe('122-18-3');
            expect(lessonDate.value).toBe('2021-06-17T02:47');
            expect(student1).toBeInTheDocument();
    });

    it('FormData should be rendered correctly', () => {
        React.useState = jest.fn().mockReturnValue([mockLessonOnEdit, {}]);

        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        const {getByTestId, container } = render(<Router history={historyMock}>< EditLesson /></Router>);
        const user1Presence = getByTestId('formData[0].presence');
         const user1Mark = getByTestId('formData[0].studentMark');
        const user2Presence = getByTestId('formData[1].presence');
        const user2Mark = getByTestId('formData[1].studentMark');
        expect(container.querySelectorAll('tr').length-1).toBe(2);
        expect(user1Presence.value).toBe('true');
        expect(user1Mark.value).toBe('10');
        expect(user2Presence.value).toBe('true');
        expect(user2Mark.value).toBe('11');
    });

    it("should change state LessonOnEdit ", async () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit,setLessonOnEdit]);
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson /></Router>);
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
                        { studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 11, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        await expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit)
    });

    it("should change student's mark", () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit,setLessonOnEdit]);
        const {getByTestId} = render(<Router history={historyMock}>< EditLesson /></Router>);
        const handleMarkChange = jest.fn();
        const userMark = getByTestId('formData[1].studentMark');
        fireEvent.blur(userMark, { target: { value: '12' } });
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
                        { studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 12, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit)

    });

    it("should change student's mark > 12", () => {
        const setLessonOnEdit = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([mockLessonOnEdit,setLessonOnEdit]);
        const { getByTestId } = render(<Router history={historyMock}>< EditLesson /></Router>);
        const handleMarkChange = jest.fn();
        const userMark = getByTestId('formData[1].studentMark');
        fireEvent.blur(userMark, { target: { value: '13' } });
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
                        { studentId: 1, studentMark: '', presence: false, comment: "", studentName: "Student Student"},
                        {studentId: 3, studentMark: 0, presence: true, comment: "", studentName: "StudenT StudenT"}]
            };
        expect(setLessonOnEdit).toHaveBeenCalledWith(mockNewLessonOnEdit)
    });

    it('should redirect to URL LESSONS if !editError && editIsLoaded',  async () => {
        const mockEditLessonSelector = {
            isLoaded: true,
            error: '',
        };
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        useSelector
            .mockReturnValueOnce(mockedLessonsSelector)
            .mockReturnValue(mockGroupSelector)
            .mockReturnValue(mockStudentsSelector)
            .mockReturnValueOnce(mockEditLessonSelector);

         render(<Router history={historyMock}>< EditLesson /></Router>);

         expect(historyMock.push.mock.calls[0][0])
            .toEqual(paths.LESSONS);
    });

    // // it('rendering and submitting a basic Formik form', async () => {
    // //     const handleSubmit = jest.fn()
    // //     render(<MyForm onSubmit={handleSubmit} />)
    // //
    // //     userEvent.type(screen.getByLabelText(/first name/i), 'John')
    // //     userEvent.type(screen.getByLabelText(/last name/i), 'Dee')
    // //     userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com')
    // //
    // //     userEvent.click(screen.getByRole('button', { name: /submit/i }))
    // //
    // //     await waitFor(() =>
    // //         expect(handleSubmit).toHaveBeenCalledWith({
    // //             email: 'john.dee@someemail.com',
    // //             firstName: 'John',
    // //             lastName: 'Dee',
    // //         }, expect.anything())
    // //     )
    // // })

    // // it('????? should redirect to URL NOT_FOUND if id is not valid => !lesson',  () => {
    // //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    // //
    // //     const mockedLessonsSelector = {
    // //         data: noLessonData,
    // //         isLoading: false,
    // //         isLoaded: true,
    // //     };
    // //     const mockEditLessonSelector = {
    // //         isLoaded: false,
    // //         error: '',
    // //     };
    // //
    // //      useSelector
    // //          .mockReturnValueOnce(mockedLessonsSelector)
    // //          .mockReturnValue(mockStudentsSelector)
    // //          // .mockReturnValue(mockGroupSelector)
    // //          // .mockReturnValue(mockEditLessonSelector);
    // //
    // //      render(<Router history={historyMock}>< EditLesson /></Router>);
    // //      expect(historyMock.push.mock.calls[0][0])
    // //         .toEqual(paths.NOT_FOUND);
    // // });
    //
    // it('should redirect to correct URL if click cancelButton', () => {
    //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    //     const { getByTestId } = render(<Router history={historyMock}>< EditLesson /></Router>);
    //     const cancelButton = getByTestId('cancelBtn');
    //
    //     fireEvent.click(cancelButton);
    //     expect(historyMock.push.mock.calls[0][0]).toEqual(paths.LESSONS);
    // });

});
