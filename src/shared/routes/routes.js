import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  Counter, ListOfStudents, NotFound,
  ListOfCourses, AddCourse, EditCourse,
  Auth,
} from '../../features/index.js';
import { ProtectedRoute } from '../../components/index.js';
import { paths } from './index.js';

export const Routes = () => (
  <>
    <Switch>
      <ProtectedRoute roles={[0, 1, 2, 3, 4]} exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <ProtectedRoute roles={[0, 4]} exact path={paths.COUNTER} component={Counter} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.STUDENTS} component={ListOfStudents} />
      <ProtectedRoute roles={[2, 3, 4]} exact path={paths.COURSES} component={ListOfCourses} />
      <ProtectedRoute roles={[3, 4]} exact path={`${paths.COURSE_EDIT}/:id`} component={EditCourse} />
      <ProtectedRoute roles={[3, 4]} exact path={paths.COURSE_ADD} component={AddCourse} />
      <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.NOT_FOUND} component={NotFound} />
      <Route exact path={paths.AUTH} component={Auth} />
      <Redirect to={paths.NOT_FOUND} />
    </Switch>
  </>
);
