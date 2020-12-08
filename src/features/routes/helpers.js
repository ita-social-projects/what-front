import React from 'react';
import {
  Link, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import { Button } from '../../components/index.js';

export const Links = () => (
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
        <li className="nav-item">
            <Link to="/lessons/add-lesson" className="nav-link">Add Lesson</Link>
        </li>
    </ul>
  </div>
);

export const RoleList = () => {
  const { url } = useRouteMatch();

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

export const Role = () => {
  const { role } = useParams();
  const history = useHistory();

  return (
    <div className="m-3">
      <h3>{`${role[0].toUpperCase() + role.slice(1)}`}</h3>
      <Button type="button" onClick={() => (history.push('/counter'))} variant="warning">Counter</Button>
      <br />
      <Button type="button" onClick={history.goBack} variant="primary">Go Back</Button>
    </div>
  );
};