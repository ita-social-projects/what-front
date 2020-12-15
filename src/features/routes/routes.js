import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { StudentsTabs, CoursesTabs, GroupsTabs, SecretariesTabs } from '@/screens/index.js';
import {
  Counter, ListOfStudents, NotFound,
  ListOfCourses, AddCourse, ListOfGroups,
  Auth, UnAssignedList, ListOfSecretaries,
} from '../index.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/students/:id" component={() => <StudentsTabs index={0}/>} />
      <Route exact path="/students/edit/:id" component={() => <StudentsTabs index={1} />} />
      <Route exact path="/secretaries" component={ListOfSecretaries} />
      <Route exact path="/secretaries/:id" render={() => <SecretariesTabs index={0} />} />
      <Route exact path="/secretaries/edit/:id" render={() => <SecretariesTabs index={1} />} />
      <Route exact path="/courses" component={ListOfCourses} />
      <Route exact path="/courses/add-course" component={AddCourse} />
      <Route exact path="/courses/:id" component={() => <CoursesTabs index={0}/>} />
      <Route exact path="/courses/edit/:id" component={() => <CoursesTabs index={1}/>} />
      <Route exact path="/groups" component={ListOfGroups} />
      <Route exact path="/groups/:id" render={() => <GroupsTabs index={0} />} />
      <Route exact path="/groups/edit/:id" render={() => <GroupsTabs index={1} />} />
      <Route exact path="/unassigned" component={UnAssignedList} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </>
);
