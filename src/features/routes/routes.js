import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Counter, ListOfStudents, NotFound, ListOfCourses } from '../index.js';
import { Links, RoleList, Role } from './helpers.js';

export const Routes = () => (
  <>
    <Links />
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/role-list" component={RoleList} />
      <Route exact path="/role-list/:role" component={Role} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path='/courses' component={ListOfCourses}/>
      <Route component={NotFound} />
    </Switch>
  </>
);