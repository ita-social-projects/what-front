import React from 'react';
import {paths, useActions} from '@/shared';
import {Router} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { render } from '@testing-library/react';
import { EditCourse} from '@/features';
import {editCourseMock} from './mocks/mock-data.js';

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

});