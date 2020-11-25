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
  return requestConfig;
},
(error) => Promise.reject(error));

export class ApiService {
  static sendRequest = async (
    url,
    method,
    jwt = '',
    data = null,
    headers = {},
  ) => {
    const reqHeaders = { ...headers };

    // if (jwt) {
    //   reqHeaders.Authorization = `Bearer ${jwt}`;
    // }
    if (data) {
      reqHeaders['Content-Type'] = 'application/json';
    }

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
  static userAuth = (userData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.AUTH_URL}`, 'POST', '', userData);

  static userRegister = (userData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.REGISTER_URL}`, 'POST', '', userData);

  static getAccounts = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.ACCOUNTS_URL}`, 'GET', jwt);

  static getUnassignedAccounts = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.NOT_ASSIGNED_URL}`, 'GET', jwt);

  // Courses
  static addCourse = (jwt, courseData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}`, 'POST', jwt, courseData);

  static getCourses = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}`, 'GET', jwt);

  static editCourse = (jwt, id, courseData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}/${id}`, 'PUT', jwt, courseData);

  static deleteCourse = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.COURSES_URL}/${id}`, 'DELETE', jwt);

  // Lessons
  static addLesson = (jwt, lessonData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}`, 'POST', jwt, lessonData);

  static getLessons = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}`, 'GET', jwt);

  static assignMentorToLesson = (jwt, assignData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSON_ASSIGN_URL}`, 'POST', jwt, assignData);

  static getLessonsByStudent = (jwt, studentId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENT_LESSONS_URL}/${studentId}`, 'GET', jwt);

  static editLesson = (jwt, id, lessonData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}/${id}`, 'PUT', jwt, lessonData);

  // mentors
  static assignMentor = (jwt, userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.LESSONS_URL}/${userId}`, 'POST', jwt);

  static getMentors = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}`, 'GET', jwt);

  static editMentor = (jwt, id, mentorData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}/${id}`, 'PUT', jwt, mentorData);

  static deleteMentor = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.MENTORS_URL}/${id}`, 'DELETE', jwt);

  // Students
  static assignStudent = (jwt, userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${userId}`, 'POST', jwt);

  static getStudentsById = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'GET', jwt);

  static getStudents = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}`, 'GET', jwt);

  static deleteStudent = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'DELETE', jwt);

  static editStudent = (jwt, id, studentData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.STUDENTS_URL}/${id}`, 'PUT', jwt, studentData);

  // Groups
  static addGroup = (jwt, groupData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}`, 'POST', jwt, groupData);

  static getGroups = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}`, 'GET', jwt);

  static editGroup = (jwt, id, groupData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'PUT', jwt, groupData);

  static getGroupById = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'GET', jwt);

  static editGroupStudents = (jwt, id, studentsData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}/students`, 'PUT', jwt, studentsData);

  static deleteGroup = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.GROUPS_URL}/${id}`, 'DELETE', jwt);

  // Themes
  static getThemes = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.THEMES_URL}`, 'GET', jwt);

  static addTheme = (jwt, themeData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.THEMES_URL}`, 'POST', jwt, themeData);

  // Secretaries
  static assignSecretary = (jwt, userId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${userId}`, 'POST', jwt);

  static getSecretaries = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}`, 'GET', jwt);

  static editSecretary = (jwt, id, secretaryData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${id}`, 'PUT', jwt, secretaryData);

  static deleteSecretary = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SECRETARIES_URL}/${id}`, 'DELETE', jwt);

  // Schedules
  static addSchedule = (jwt, scheduleData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}`, 'POST', jwt, scheduleData);

  static getSchedules = (jwt) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}`, 'GET', jwt);

  static getScheduleById = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'GET', jwt);

  static editSchedule = (jwt, id, scheduleData) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'PUT', jwt, scheduleData);

  static deleteSchedule = (jwt, id) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${id}`, 'DELETE', jwt);

  static getGroupSchedule = (jwt, groupId) => ApiService.sendRequest(`${ApiConfig.BASE_URL}${ApiConfig.SCHEDULE_URL}/${groupId}/groupSchedule`, 'GET', jwt);
}
