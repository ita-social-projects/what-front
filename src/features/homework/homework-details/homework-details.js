import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared/index.js';

import { WithLoading } from '@/components/index.js';
import { Badge } from 'react-bootstrap';

import classNames from 'classnames';

export const HomeworkDetails = () => {
  const history = useHistory();

  const editBtn = () => {
    history.push(paths.HOMEWORK_EDIT);
  };

  const homework = {
      
  };
     

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames("col-sm-12 card shadow">
          <div className="px-2 py-4">
            <h3>Homework Details</h3>
            <hr />
            <WithLoading isLoading={false}
              className="d-block mx-auto m-0"
            >
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">First Name:</span>
                <span className="col-12 col-md-6">{mentor?.firstName}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Last Name:</span>
                <span className="col-12 col-md-6 ">{mentor?.lastName}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Email:</span>
                <span className="col-12 col-md-6">{mentor?.email}</span>
              </div>
              <hr />
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder"><span>Group('s): </span></div>
              <div className="col-12 col-md-6 d-flex flex-wrap lead">
                {mentorGroups
                  .map(({ id, name }) => (
                    <div className="pr-2" key={id}>
                      <Badge pill variant="info">
                        <Link
                          to={`${paths.GROUPS_DETAILS}/${id}`}
                          className="text-decoration-none text-light"
                        >{name}
                        </Link>
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder"><span>Course('s): </span></div>
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                  {mentorCourses
                    .map(({ id, name }) => (
                      <div className="pr-2" key={id}>
                        <Badge pill variant="info">
                          <Link
                            to={`${paths.COURSE_DETAILS}/${id}`}
                            className="text-decoration-none text-light"
                          >{name}</Link>
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
