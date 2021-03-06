import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { number, shape } from 'prop-types';
import classNames from 'classnames';

import { WithLoading } from '@/components';
import { paths } from '@/shared';
import { coursesStateShape } from '@features/shared';
import { currentUserSelector } from '@/models';

export const CourseDetails = ({ id, coursesData }) => {
  const { data, isLoading, loaded } = coursesData;
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const course = data.find((course) => course.id == id);

  const history = useHistory();

  useEffect(() => {
    if (!course && loaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [course, history, loaded]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames('col-sm-12 card shadow',
          { 'col-md-12': currentUser.role === 3 || currentUser.role === 4,
            'col-md-6': currentUser.role === 2 || currentUser.role === 1 })}
        >
          <div className="px-2 py-4">
            <h3>Course Details</h3>
            <hr />
            <WithLoading isLoading={isLoading || !loaded} className="d-block mx-auto">
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Course name: </span></div>
                <div className="col-12 col-md-6"><span>{course?.name}</span></div>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseDetails.propTypes = {
  id: number.isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
