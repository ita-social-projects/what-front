import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import { useActions } from '@/shared/hooks';
import { commonHelpers } from '@/utils';

import { EditGroup } from '../';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({
	useActions: jest.fn()
}));

describe('Edit group', () => {
	let mockedState;
	beforeEach(() => {
		mockedState = {
			isLoading: false,
		  isLoaded: true,
		  error: '',
		};
		useSelector.mockReturnValue(mockedState);

		const useActionsFns = {
			dispatchEditGroup: jest.fn(),
			dispatchAddAlert: jest.fn()
		};
		useActions.mockReturnValue([
			useActionsFns.dispatchEditGroup,
			useActionsFns.dispatchAddAlert
		]);

		commonHelpers.transformDateTime = jest.fn().mockReturnValue({
			date: '15.06.2021'
		});
	});

	it('should render edit-group component', () => {
		const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
		const id = 1;
		const initialValues = {
      name: 'testName',
      startDate: '2021-05-16T00:00:00',
      finishDate: '2022-06-16T00:00:00',
      courseId: 9,
      mentor: '',
      student: ''
    };
		const studentGroupData = {
			data: {
				courseId: 9,
				finishDate: '2022-06-16T00:00:00',
				id: 1,
				mentorsIds: [9],
				name: '122-18-3',
				startDate: '2021-05-16T00:00:00',
				studentIds: [1, 3, 4, 23, 26, 35],
			},
			error: '',
			isLoaded: true,
			isLoading: false
		};
		const studentsData = {
			data: [
				{
					avatarUrl: null,
					email: 'student@gmail.com',
					firstName: 'student',
					id: 1,
					lastName: 'student'
				},
				{
					avatarUrl: null,
					email: 'Student@gmail.org',
					firstName: 'Student',
					id: 2,
					lastName: 'Student'
				}
			],
			error: '',
			isLoaded: true,
			isLoading: false
		};
		const mentorsData = {
			data: [
				{
					avatarUrl: null,
					email: 'mentor@gmail.com',
					firstName: 'mentor',
					id: 1,
					lastName: 'mentor'
				},
				{
					avatarUrl: null,
					email: 'Mentor@gmail.org',
					firstName: 'Mentor',
					id: 2,
					lastName: 'Mentor'
				}
			],
			error: '',
			isLoaded: true,
			isLoading: false
		};
		const coursesData = {
			data: [
				{
					id: 1,
					isActive: true,
					name: '123 Testing'
				},
				{
					id: 1,
					isActive: true,
					name: '123 Testing'
				}
			],
			error: '',
			isLoading: false,
			loaded: true
		};

		const { getByTestId, debug } = render(
			<Router history={historyMock}>
				<EditGroup
					id={id}
					initialValues={initialValues}
					coursesData={coursesData}
					mentorsData={mentorsData}
					studentsData={studentsData}
					studentGroupData={studentGroupData}
				/>
			</Router>
		);

		expect(getByTestId('editGroup')).toBeInTheDocument();
	});

	// it('submits correct values', () => {
	// 	const { container } = render(<EditGroup />);
	// 	const name = 
	// });	
});
