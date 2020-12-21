import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

import {
  AddCourse,
  alertSelector,
  Counter,
  removeAlert,
  ListOfCourses, ListOfGroups,
  ListOfSecretaries,
  ListOfStudents, UnAssignedList, NotFound,
  ListOfLessons, AddLesson, EditLesson,
} from '@/features';
import { Header } from '@/features/index.js';
import { paths, useActions } from '@/shared';
import { CoursesTabs, GroupsTabs, SecretariesTabs, StudentsTabs } from '@/screens';
import { ProtectedRoute } from '@/components';
import styles from './layout.scss';

export const Layout = () => {
  const { messages } = useSelector(alertSelector, shallowEqual);
  const dispatchRemoveAlert = useActions(removeAlert);

  return (
    <>
      <Header />
      {
        messages.length ? (
          <div className={styles['alert-container']}>
            {
              messages.map(({ variant, message, id }) => (
                <Alert
                  variant={variant}
                  key={id}
                  dismissible
                  onClose={() => dispatchRemoveAlert(id)}
                >
                  {message}
                </Alert>
              ))
            }
          </div>
        ) : null
      }
      <div className="p-5 position-relative">
        <Switch>
          <ProtectedRoute roles={[0, 4]} exact path={paths.COUNTER} component={Counter} />
          <ProtectedRoute roles={[4]} exact path={paths.SECRETARIES} component={ListOfSecretaries} />
          <ProtectedRoute roles={[4]} exact path={`${paths.SECRETARIES_DETAILS}/:id`} render={() => <SecretariesTabs index={0} />} />
          <ProtectedRoute roles={[4]} exact path={`${paths.SECRETARY_EDIT}/:id`} render={() => <SecretariesTabs index={1} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.STUDENTS} component={ListOfStudents} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.STUDENTS_DETAILS}/:id`} component={() => <StudentsTabs index={0} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.STUDENT_EDIT}/:id`} component={() => <StudentsTabs index={1} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.COURSES} component={ListOfCourses} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.COURSE_ADD} component={AddCourse} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.COURSE_DETAILS}/:id`} component={() => <CoursesTabs index={0} />} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.COURSE_EDIT}/:id`} component={() => <CoursesTabs index={1} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.GROUPS} component={ListOfGroups} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUPS_DETAILS}/:id`} render={() => <GroupsTabs index={0} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUP_EDIT}/:id`} render={() => <GroupsTabs index={1} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.UNASSIGNED_USERS} component={UnAssignedList} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.LESSONS} component={ListOfLessons} />
          <ProtectedRoute roles={[2, 4]} exact path={paths.LESSON_ADD} component={AddLesson} />
          <ProtectedRoute roles={[2, 4]} exact path={`${paths.LESSON_EDIT}/:id`} component={EditLesson} />
          <ProtectedRoute roles={[0, 1, 2, 3, 4]} exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
        </Switch>
      </div>
    </>
  );
};
