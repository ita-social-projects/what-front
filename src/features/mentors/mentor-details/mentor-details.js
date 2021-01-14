import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared/index.js';
import { WithLoading } from '@/components/index.js';
import { mentorIdSelector, fetchMentorById, fetchActiveMentors, currentUserSelector,
  mentorCoursesSelector, mentorGroupsSelector } from '@/models/index.js';
import { Badge } from 'react-bootstrap';
import classNames from 'classnames';
import styles from "@features/students/student-details/student-details.scss";

export const MentorDetails = ({ id }) => {
  const history = useHistory();
  const {
    data: mentor,
    isLoading: mentorIsLoading,
    isLoaded: mentorIsLoaded,
    error: mentorError
  } = useSelector(mentorIdSelector, shallowEqual);
  
  const {
    data: mentorGroups,
    isLoading: mentorGroupsAreLoading,
    isLoaded: mentorGroupsAreLoaded,
    error: mentorGroupsError
  } = useSelector(mentorGroupsSelector, shallowEqual);
  
  const {
    data: mentorCourses,
    isLoading:mentorCoursesAreLoading ,
    isLoaded: mentorCoursesAreLoaded,
    error: mentorCoursesError
  } = useSelector(mentorCoursesSelector, shallowEqual);
  
  
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [
    dispatchLoadMentors,
  ] = useActions([fetchMentorById, fetchActiveMentors]);
  
  useEffect(() => {
    if (mentorError && mentorCoursesError && mentorGroupsError) {
      history.push(paths.NOT_FOUND);
    }
  }, [mentorError, mentorCoursesError, mentorGroupsError, history]);
  
  useEffect(() => {
    dispatchLoadMentors(id);
  }, [dispatchLoadMentors, id]);
  
  
 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames("col-sm-12 card shadow",
          { "col-md-12": currentUser.role !== 2, "col-md-6": currentUser.role === 2})}
        >
          <div className="px-2 py-4">
            <h3>Mentor Details</h3>
            <hr />
            <WithLoading isLoading={mentorIsLoading || !mentorIsLoaded} className="d-block mx-auto m-0">
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
            </WithLoading>
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder"><span>Group('s): </span></div>
              <WithLoading isLoading={mentorGroupsAreLoading}  className="d-block mx-auto"
              >
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                  {mentorGroups
                    .map(({ id, name }) => (
                      <div className="pr-2" key={id}>
                        <Badge pill variant="primary">
                          <Link
                            to={`${paths.MENTORS_DETAILS}/${id}`}
                            className="text-decoration-none text-white"
                          >{name}
                          </Link>
                        </Badge>
                      </div>
                    ))}
                </div>
              </WithLoading>
            </div>
            <hr/>
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder"><span>Course('s): </span></div>
              <WithLoading
                isLoading={mentorCoursesAreLoading}
                className="mx-auto d-block"
              >
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                  {mentorCourses
                    .map(({ id, name }) => (
                      <div className="pr-2" key={id}>
                        <Badge pill variant="primary">
                          <Link
                            to={`${paths.COURSE_DETAILS}/${id}`}
                            className="text-decoration-none text-white"
                          >{name}</Link>
                        </Badge>
                      </div>
                    ))}
                </div>
              </WithLoading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MentorDetails.propTypes = {
  id: number.isRequired,
};
