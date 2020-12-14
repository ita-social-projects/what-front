import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SecretariesTabs } from '@/screens/index.js';
import {
  Counter, ListOfStudents, NotFound, ListOfCourses, AddCourse, EditCourse, ListOfSecretaries,
} from '../index.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/courses" component={ListOfCourses} />
      <Route exact path="/courses/edit-course/:id" component={EditCourse} />
      <Route exact path="/add-course" component={AddCourse} />
      <Route exact path="/secretaries" component={ListOfSecretaries} />
      <Route exact path="/secretaries/:id" render={() => <SecretariesTabs index={0} />} />
      <Route exact path="/secretaries/edit/:id" render={() => <SecretariesTabs index={1} />} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </>
);
