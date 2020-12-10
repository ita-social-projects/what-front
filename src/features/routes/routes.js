import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Counter, ListOfStudents, ListOfSecretaries, EditSecretarysDetails, NotFound,
} from '../index.js';
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
      <Route exact path="/secretaries" component={ListOfSecretaries} />
      <Route exact path="/secretaries/:id" render={() => (<h3>Secretarys Details</h3>)} />
      <Route exact path="/secretaries/edit/:id" component={EditSecretarysDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
);
