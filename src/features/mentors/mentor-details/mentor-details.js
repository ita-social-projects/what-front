import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared/index.js';
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
      history.push(paths.NOT_FOUND);
    }
  }, [error, history]);

  return (
    <div className="w-100 card shadow p-4">
      <h3>Mentor Details</h3>
      <hr />
      <WithLoading isLoading={isLoading || !isLoaded} className="d-block mx-auto m-0">
        <div className="d-flex flex-column">
          <div className="row">
            <p className="col-6">First Name:</p>
            <p className="col-6">{mentor?.firstName}</p>
          </div>
          <div className="row">
            <p className="col-6">Last Name:</p>
            <p className="col-6">{mentor?.lastName}</p>
          </div>
          <div className="row">
            <p className="col-6">Email:</p>
            <p className="col-6">{mentor?.email}</p>
          </div>
        </div>
      </WithLoading>
    </div>
  );
};

MentorDetails.propTypes = {
  id: number.isRequired,
};
