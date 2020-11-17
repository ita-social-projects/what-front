import React from 'react';
import { Link, Switch, Route, useParams, useRouteMatch, useHistory } from 'react-router-dom';

import { Counter } from '../index.js';
import { Button } from '../../components/index.js'

export const Routes = () => (
    <>
      <div className="mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/counter" className="nav-link">Counter</Link>
          </li>
          <li className="nav-item">
            <Link to="/role-list" className="nav-link">Role List</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/role-list" component={RoleList} />
        <Route path="/role-list/:role" component={Role} />
        <Route render={() => <h2 className="m-3">Page Not Found</h2>} />
      </Switch>
    </>
  );

const RoleList = () => {

  let { url } = useRouteMatch();
  
  return (
    <div className="m-3">
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">
          <Link to={`${url}/secretary`}>Secretary</Link>
        </li>
        <li className="list-group-item">
          <Link to={`${url}/mentor`}>Mentor</Link>
        </li>
        <li className="list-group-item">
          <Link to={`${url}/student`}>Student</Link>
        </li>
      </ul>
    </div>
  );
};

const Role = () => {

  const { role } = useParams();
  const history = useHistory();
  
  return (
    <div className="m-3">
      <h3>{`${role[0].toUpperCase() + role.slice(1)}`}</h3>            
      <Button type="button" onClick={history.goBack} variant="primary">Go Back</Button>
    </div>
  );
};