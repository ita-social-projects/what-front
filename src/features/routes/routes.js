import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MentorTabs } from '@/screens';
import {
  Counter, ListOfStudents, NotFound, ListOfMentors,
} from '../index.js';
import { RoleList, Role } from './helpers.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/role-list" component={RoleList} />
      <Route exact path="/role-list/:role" component={Role} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/mentors" component={ListOfMentors} />
      <Route exact path="/mentors/:id" component={() => <MentorTabs index={0} />} />
      <Route exact path="/mentors/edit/:id" component={() => <MentorTabs index={1} />} />
      <Route component={NotFound} />
    </Switch>
  </>
);
