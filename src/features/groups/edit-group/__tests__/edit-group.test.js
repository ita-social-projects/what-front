import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { useActions, useState } from '@/shared/hooks';
import { commonHelpers } from '@/utils';
import { id,
	initialValues,
	studentGroupData,
	studentsData,
	mentorsData,
	coursesData,
	formValues,
	studentGroupDataLoading } from './mocks/mock-data';
import { useStates, useStateMock } from './mocks/mock-useState';
import { EditGroup, Button, addMentor, addStudent } from '../';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({
	useActions: jest.fn()
}));

describe('Edit group', () => {
	let mockedState;
	let historyMock;

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
			formInitialValue: '2022-06-16'
		});

		historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
	});

	afterEach(cleanup);

	it('should render edit-group component', () => {
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

  it('should loader appear when studentGroup Loading is true', () => {
    const { container } = render(
    	<Router history={historyMock}>
				<EditGroup
					id={id}
					initialValues={initialValues}
					coursesData={coursesData}
					mentorsData={mentorsData}
					studentsData={studentsData}
					studentGroupData={studentGroupDataLoading}
				/>
			</Router>
		);
    const loader = container.querySelector('.spinner-border');

    expect(loader).toBeInTheDocument();
  });

  it('should datalist of mentors = 2', () => {
    const { container } = render(
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
    const mentorsList = container.querySelector('#mentors-list');

    expect(mentorsList.children.length).toEqual(2);
  });

  it('should datalist of students = 2', () => {
    const { container } = render(
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
    const studentsList = container.querySelector('#students-list');

    expect(studentsList.children.length).toEqual(2);
  });


	it('should call addMentor and addStudent 1 time', async () => {
    const { container, getByTestId } = render(
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
		const addMentor = jest.fn();
  	const addStudent = jest.fn();
		const addMentorBtn = container.querySelector('#add-mentor-btn');
		const addStudentBtn = container.querySelector('#add-student-btn');

	  await waitFor(() => {
	    fireEvent.click(addMentorBtn);
	    addMentor();
	  });
	  expect(addMentor).toHaveBeenCalledTimes(1);

	  await waitFor(() => {
	    fireEvent.click(addStudentBtn);
	    addStudent();
	  });
	  expect(addStudent).toHaveBeenCalledTimes(1);
	});

  it('should submit Form', async () => {
    const { container } = render(
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
    const inputGroupName = container.querySelector('#group-name');
    const inputCourseName = container.querySelector('#course-name');
    const inputStartDate = container.querySelector('#start-date');
    const inputFinishDate = container.querySelector('#finish-date');
    const submitBtn = container.querySelector('#submit');
    const handleSubmit = jest.fn();

    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(inputGroupName, { target: { value: formValues.groupName } });
      fireEvent.change(inputCourseName, { target: { value: coursesData.data[1] } });
      fireEvent.change(inputStartDate, { target: { value: formValues.startDate } });
      fireEvent.change(inputFinishDate, { target: { value: formValues.finishDate } });
    });
    React.useState = useStateMock.submit;
    await waitFor(() => {
      fireEvent.click(submitBtn);
      handleSubmit();
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
