import React, { useEffect } from 'react';
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
  ListOfStudents, UnAssignedList,
} from '@/features';
import { Header } from '@/features/index.js';
import { useActions } from '@/shared';
import { CoursesTabs, GroupsTabs, SecretariesTabs } from '@/screens';
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
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/students" component={ListOfStudents} />
          <Route exact path="/secretaries" component={ListOfSecretaries} />
          <Route exact path="/secretaries/:id" render={() => <SecretariesTabs index={0} />} />
          <Route exact path="/secretaries/edit/:id" render={() => <SecretariesTabs index={1} />} />
          <Route exact path="/courses" component={ListOfCourses} />
          <Route exact path="/courses/add-course" component={AddCourse} />
          <Route exact path="/courses/:id" component={() => <CoursesTabs index={0} />} />
          <Route exact path="/courses/edit/:id" component={() => <CoursesTabs index={1} />} />
          <Route exact path="/groups" component={ListOfGroups} />
          <Route exact path="/groups/:id" render={() => <GroupsTabs index={0} />} />
          <Route exact path="/groups/edit/:id" render={() => <GroupsTabs index={1} />} />
          <Route exact path="/unassigned" component={UnAssignedList} />
          <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </>
  );
};
