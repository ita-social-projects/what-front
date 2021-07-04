import React from 'react';
import { studentGroupData, mentorsData, studentsData } from './mock-data.js';

const useStates = {
	groupMentors: {
		groupMentors: [],
		setGroupMentors: jest.fn()
	},
	mentorInputError: {
		mentorInputError: '',
		setMentorInputError: jest.fn()
	},
	groupStudents: {
		groupStudents: [],
		setGroupStudents: jest.fn()
	},
	studentInputError: {
		studentInputError: '',
		setStudentInputError: jest.fn()
	}
};

const submitFormUseStates = {
	groupMentors: {
		groupMentors: [],
		setGroupMentors: jest.fn(mentorsData.data[0])
	},
	mentorInputError: {
		mentorInputError: '',
		setMentorInputError: jest.fn()
	},
	groupStudents: {
		groupStudents: [],
		setGroupStudents: jest.fn(studentsData.data[0])
	},
	studentInputError: {
		studentInputError: '',
		setStudentInputError: jest.fn()
	}
};

const useStateMock = {
	default: jest.fn()
		.mockReturnValueOnce([
			useStates.groupMentors.groupMentors, 
			useStates.groupMentors.setGroupMentors])
		.mockReturnValueOnce([
			useStates.mentorInputError.mentorInputError,
			useStates.mentorInputError.setMentorInputError])
		.mockReturnValueOnce([
			useStates.groupStudents.groupStudents,
			useStates.groupStudents.setGroupStudents])
		.mockReturnValueOnce([
			useStates.studentInputError.studentInputError,
			useStates.studentInputError.setStudentInputError
		]),

	submit: jest.fn()
		.mockReturnValueOnce([
			submitFormUseStates.groupMentors.groupMentors, 
			submitFormUseStates.groupMentors.setGroupMentors])
		.mockReturnValueOnce([
			submitFormUseStates.mentorInputError.mentorInputError,
			submitFormUseStates.mentorInputError.setMentorInputError])
		.mockReturnValueOnce([
			submitFormUseStates.groupStudents.groupStudents,
			submitFormUseStates.groupStudents.setGroupStudents])
		.mockReturnValueOnce([
			submitFormUseStates.studentInputError.studentInputError,
			submitFormUseStates.studentInputError.setStudentInputError
		])
};

export { useStates, useStateMock };
