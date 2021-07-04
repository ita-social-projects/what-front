export const id = 1;

export const initialValues = {
	name: 'testName',
	startDate: '2021-05-16T00:00:00',
	finishDate: '2022-06-16T00:00:00',
	courseId: 9,
	mentor: '',
	student: ''
};

export const studentGroupData = {
	data: {
		courseId: 9,
		finishDate: '2022-06-16T00:00:00',
		id: 1,
		mentorsIds: [9],
		name: '122-18-3',
		startDate: '2021-05-16T00:00:00',
		studentIds: [1, 2],
	},
	error: '',
	isLoaded: true,
	isLoading: false
};

export const studentGroupDataLoading = {
	data: {
		courseId: 9,
		finishDate: '2022-06-16T00:00:00',
		id: 1,
		mentorsIds: [9],
		name: '122-18-3',
		startDate: '2021-05-16T00:00:00',
		studentIds: [1, 2],
	},
	error: '',
	isLoaded: false,
	isLoading: true
};

export const studentsData = {
	data: [
		{
			email: "student@gmail.com",
			firstName: "Student",
			id: 4,
			lastName: "Student",
			avatarUrl: null
		},
		{
			email: "student222@gmail.com",
			firstName: "Student222",
			id: 5,
			lastName: "Student222",
			avatarUrl: null
		}
	],
	error: '',
	isLoaded: true,
	isLoading: false
};

export const mentorsData = {
	data: [
		{
			avatarUrl: null,
			email: 'mentor@gmail.com',
			firstName: 'mentor',
			id: 9,
			lastName: 'mentor'
		},
		{
			avatarUrl: null,
			email: 'Mentor@gmail.org',
			firstName: 'Mentor',
			id: 3,
			lastName: 'Mentor'
		}
	],
	error: '',
	isLoaded: true,
	isLoading: false
};

export const coursesData = {
	data: [
		{
			id: 1,
			isActive: true,
			name: '123 Testing'
		},
		{
			id: 2,
			isActive: true,
			name: 'Testing 123'
		}
	],
	error: '',
	isLoading: false,
	loaded: true
};

export const formValues = {
  groupName: 'testName 1',
  startDate: '2021-02-21',
  finishDate: '2021-12-21'
};
