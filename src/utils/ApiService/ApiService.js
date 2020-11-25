import axios from 'axios';

import { ApiConfig } from './config.js';
import { getCookie } from '../helpers/index.js';

axios.interceptors.response.use((response) => {
  const authHeader = response.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    document.cookie = `jwt=${token};max-age=86400`;
  }
  return response;
});

axios.interceptors.request.use((config) => {
  const requestConfig = { ...config };
  if (requestConfig.url !== `${ApiConfig.BASE_URL}${ApiConfig.AUTH_URL}` && requestConfig.url !== `${ApiConfig.BASE_URL}${ApiConfig.REGISTER_URL}`) {
    const token = getCookie('jwt');

    if (requestConfig.headers) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    } else {
      requestConfig.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  if (requestConfig.data) {
    if (requestConfig.headers) {
      requestConfig.headers['Content-Type'] = 'application/json';
    } else {
      requestConfig.headers = {
        'Content-Type': 'application/json',
      };
    }
  }
  return requestConfig;
},
(error) => Promise.reject(error));

export class ApiService {
  static sendRequest = async (
    url,
    method,
    data = null,
    headers = {},
  ) => {
    const reqHeaders = { ...headers };
    const response = await axios(url, {
      method,
      data,
      headers: Object.keys(reqHeaders).length ? reqHeaders : null,
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw Error(`Request failed. ${response.statusText}`);
    }
    return response.data;
  };

  // accounts
  static userAuth = (userData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.AUTH_URL}`, 'POST', userData);

  static userRegister = (userData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.REGISTER_URL}`, 'POST', userData);

  static getAccounts = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.ACCOUNTS_URL}`, 'GET');

  static getUnassignedAccounts = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.NOT_ASSIGNED_URL}`, 'GET');

  // Courses
  static addCourse = (courseData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}`, 'POST', courseData);

  static getCourses = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}`, 'GET');

  static editCourse = (id, courseData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}/${id}`, 'PUT', courseData);

  static deleteCourse = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}/${id}`, 'DELETE');

  // Lessons
  static addLesson = (lessonData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}`, 'POST', lessonData);

  static getLessons = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}`, 'GET');

  static assignMentorToLesson = (assignData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSON_ASSIGN_URL}`, 'POST', assignData);

  static getLessonsByStudent = (studentId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENT_LESSONS_URL}/${studentId}`, 'GET');

  static editLesson = (id, lessonData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}/${id}`, 'PUT', lessonData);

  // mentors
  static assignMentor = (userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}/${userId}`, 'POST');

  static getMentors = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}`, 'GET');

  static editMentor = (id, mentorData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}/${id}`, 'PUT', mentorData);

  static deleteMentor = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}/${id}`, 'DELETE');

  // Students
  static assignStudent = (userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${userId}`, 'POST');

  static getStudentsById = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'GET');

  static getStudents = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}`, 'GET');

  static deleteStudent = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'DELETE');

  static editStudent = (id, studentData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'PUT', studentData);

  // Groups
  static addGroup = (groupData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}`, 'POST', groupData);

  static getGroups = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}`, 'GET');

  static editGroup = (id, groupData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'PUT', groupData);

  static getGroupById = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'GET');

  static editGroupStudents = (id, studentsData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}/students`, 'PUT', studentsData);

  static deleteGroup = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'DELETE');

  // Themes
  static getThemes = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.THEMES_URL}`, 'GET');

  static addTheme = (themeData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.THEMES_URL}`, 'POST', themeData);

  // Secretaries
  static assignSecretary = (userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${userId}`, 'POST');

  static getSecretaries = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}`, 'GET');

  static editSecretary = (id, secretaryData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${id}`, 'PUT', secretaryData);

  static deleteSecretary = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${id}`, 'DELETE');

  // Schedules
  static addSchedule = (scheduleData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}`, 'POST', scheduleData);

  static getSchedules = () => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}`, 'GET');

  static getScheduleById = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'GET');

  static editSchedule = (id, scheduleData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'PUT', scheduleData);

  static deleteSchedule = (id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'DELETE');

  static getGroupSchedule = (groupId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${groupId}/groupSchedule`, 'GET');
}
