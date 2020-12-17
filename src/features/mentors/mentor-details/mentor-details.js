import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import { WithLoading } from '@/components/index.js';
import {
  mentorIdSelector, fetchMentorById, fetchActiveMentors,
} from '@/models/index.js';

export const MentorDetails = ({ id }) => {
  const {
    data: mentor,
    isLoading,
    isLoaded,
    error,
  } = useSelector(mentorIdSelector, shallowEqual);

  const [
    dispatchLoadMentors,
  ] = useActions([fetchMentorById, fetchActiveMentors]);

  const history = useHistory();

  useEffect(() => {
    dispatchLoadMentors(id);
  }, [dispatchLoadMentors, id]);
  
  useEffect(() => {
    if (error) {
      history.push('/404')
    }
  }, [error])
  
  return (
    <div className="w-100 card shadow p-4">
      <h3>Mentor Details</h3>
      <hr />
      <WithLoading isLoading={isLoading || !isLoaded} className="d-block mx-auto m-0">
        <div className="d-flex flex-column">
          <div className="row">
            <p className="col-12 col-md-6">First Name:</p>
            <p className="col-12 col-md-6 font-weight-bolder">{mentor?.firstName}</p>
          </div>
          <div className="row">
            <p className="col-12 col-md-6">Last Name:</p>
            <p className="col-12 col-md-6 font-weight-bolder">{mentor?.lastName}</p>
          </div>
          <div className="row">
            <p className="col-12 col-md-6">Email:</p>
            <p className="col-12 col-md-6 font-weight-bolder">{mentor?.email}</p>
          </div>
        </div>
      </WithLoading>
    </div>
  );
};

MentorDetails.propTypes = {
  id: number.isRequired,
};
