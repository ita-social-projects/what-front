import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Counter, ListOfStudents, NotFound, Auth,
} from '../index.js';
import { Links, RoleList, Role } from './helpers.js';
import { Counter, ListOfStudents, NotFound, ListOfCourses, AddCourse, EditCourse } from '../index.js';
import { RoleList, Role } from './helpers.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/role-list" component={RoleList} />
      <Route exact path="/role-list/:role" component={Role} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path='/courses' component={ListOfCourses}/>
      <Route exact path='/courses/edit-course/:id' component={EditCourse} />
      <Route exact path='/add-course' component={AddCourse} />
      <Route component={NotFound} />
    </Switch>
  </>
);
