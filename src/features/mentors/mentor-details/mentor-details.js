import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared/index.js';
import { WithLoading } from '@/components/index.js';
import { mentorIdSelector, fetchMentorById, fetchActiveMentors, currentUserSelector } from '@/models/index.js';
import classNames from 'classnames';

export const MentorDetails = ({ id }) => {
  const {
    data: mentor,
    isLoading,
    isLoaded,
    error,
  } = useSelector(mentorIdSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [
    dispatchLoadMentors,
  ] = useActions([fetchMentorById, fetchActiveMentors]);

  const history = useHistory();

  useEffect(() => {
    dispatchLoadMentors(id);
  }, [dispatchLoadMentors, id]);

  useEffect(() => {
    if (error) {
      history.push(paths.NOT_FOUND);
    }
  }, [error, history]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames("col-sm-12 card shadow", 
          { "col-md-12": currentUser.role !== 2, "col-md-6": currentUser.role === 2})}
        >
          <div className="px-2 py-4">
            <h3>Mentor Details</h3>
            <hr />
            <WithLoading isLoading={isLoading || !isLoaded} className="d-block mx-auto m-0">
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
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

MentorDetails.propTypes = {
  id: number.isRequired,
};
