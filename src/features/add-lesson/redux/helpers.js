import axios from 'axios';

export const fetchGroups = () => axios.get('http://localhost:3000/api/student_groups')
  .then((response) => response.data);

export const fetchStudents = () => axios.get('http://localhost:3000/api/students')
  .then((response) => response.data);

export const fetchMentors = () => axios.get('http://localhost:3000/api/mentors')
  .then((response) => response.data);