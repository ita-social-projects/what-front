import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  Counter, ListOfStudents, NotFound, ListOfCourses, AddCourse, EditCourse, GroupDetails,
} from '../index.js';
import { RoleList, Role } from './helpers.js';
import { GroupsTabs } from '../../screens/index.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/role-list" component={RoleList} />
      <Route exact path="/role-list/:role" component={Role} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/courses" component={ListOfCourses} />
      <Route exact path="/courses/edit-course/:id" component={EditCourse} />
      <Route exact path="/add-course" component={AddCourse} />
      <Route exact path="/groups/:id" component={() => <GroupsTabs index={0} />} />
      <Route exact path="/groups/edit/:id" component={() => <GroupsTabs index={1} />} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </>
);
