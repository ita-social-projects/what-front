import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { SecretariesTabs, CoursesTabs, GroupsTabs } from '@/screens/index.js';
import {
  Counter, ListOfStudents, NotFound,
  ListOfCourses, AddCourse, ListOfGroups,
  Auth, ListOfSecretaries, UnAssignedList,
} from '../../features/index.js';
import { ProtectedRoute } from '../../components/index.js';
import { paths } from './index.js';

export const Routes = () => (
  <>
    <Switch>
      <ProtectedRoute roles={[0, 1, 2, 3, 4]} exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <ProtectedRoute roles={[0, 4]} exact path={paths.COUNTER} component={Counter} />
      <ProtectedRoute roles={[4]} exact path={paths.SECRETARIES} component={ListOfSecretaries} />
      <ProtectedRoute roles={[4]} exact path={`${paths.SECRETARIES_DETAILS}/:id`} render={() => <SecretariesTabs index={0} />} />
      <ProtectedRoute roles={[4]} exact path={`${paths.SECRETARY_EDIT}/:id`} render={() => <SecretariesTabs index={1} />} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.STUDENTS} component={ListOfStudents} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.COURSES} component={ListOfCourses} />
      <ProtectedRoute roles={[3, 4]} exact path={paths.COURSE_ADD} component={AddCourse} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.COURSE_DETAILS}/:id`} component={() => <CoursesTabs index={0} />} />
      <ProtectedRoute roles={[3, 4]} exact path={`${paths.COURSE_EDIT}/:id`} component={() => <CoursesTabs index={1} />} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.GROUPS} component={ListOfGroups} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUPS_DETAILS}/:id`} render={() => <GroupsTabs index={0} />} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUP_EDIT}/:id`} render={() => <GroupsTabs index={1} />} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.UNASSIGNED_USERS} component={UnAssignedList} />
      <ProtectedRoute roles={[0, 1, 2, 3, 4]} exact path={paths.NOT_FOUND} component={NotFound} />
      <Route exact path={paths.AUTH} component={Auth} />
      <Redirect to={paths.NOT_FOUND} />
    </Switch>
  </>
);
