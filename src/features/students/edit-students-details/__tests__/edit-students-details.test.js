import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { paths } from '@/shared';
import { useSelector } from 'react-redux';
// import { mockCurrentStudentSelector,
//          mockCurrentStudentGroupsSelector,
//          mockStudentsLessonsSelector }
// from './mock-data.js';
import { EditStudentsDetails } from '../edit-students-details.js';

// jest.mock('react-redux', () => ({useSelector: jest.fn()}));
// jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

describe('Edit-students-details component', () => {

	it('render edit-students-component', () => {
		render(<EditStudentsDetails />);
		screen.debug();
		expect(screen.getByText(/Student Editing/i).toBeInTheDocument());
	});
});