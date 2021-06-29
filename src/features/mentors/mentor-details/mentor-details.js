import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared/index.js';
import { mentorIdSelector, fetchMentorById, fetchActiveMentors, currentUserSelector,
  mentorCoursesSelector, mentorGroupsSelector } from '@/models/index.js';
import { WithLoading } from '@/components/index.js';
import { Badge } from 'react-bootstrap';

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
    <div className="container" data-testid='mentorDetails'>
      <div className="row justify-content-center">
        <div className="col-sm-12 card shadow">
          <div className="px-2 py-4">
            <h3>Mentor Details</h3>
            <hr />
            {/* test */}
            <WithLoading isLoading={mentorIsLoading || !mentorIsLoaded}
              className="d-block mx-auto m-0"
            >
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">First Name:</span>
                <span className="col-12 col-md-6" data-testid='firstName'>{mentor?.firstName}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Last Name:</span>
                <span className="col-12 col-md-6" data-testid='lastName'>{mentor?.lastName}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Email:</span>
                <span className="col-12 col-md-6" data-testid='email'>{mentor?.email}</span>
              </div>
              <hr />
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder"><span>Group('s): </span></div>
              {/* test */}
              <WithLoading
                isLoading={mentorGroupsAreLoading || !mentorGroupsAreLoaded}
                className="d-block mx-auto m-0"
              >
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                  {mentorGroups
                    .map(({ id, name }) => (
                      <div className="pr-2" key={id}>
                        <Badge pill variant="info">
                          <Link
                            to={`${paths.GROUPS_DETAILS}/${id}`}
                            className="text-decoration-none text-light group-link"
                            data-testid='groupLink'
                            data-testgroupidparam={id}
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
              {/* test */}
              <WithLoading
                isLoading={mentorCoursesAreLoading || !mentorCoursesAreLoaded}
                className="d-block mx-auto m-0"
              >
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                  {mentorCourses
                    .map(({ id, name }) => (
                      <div className="pr-2" key={id}>
                        <Badge pill variant="info">
                          <Link
                            to={`${paths.COURSE_DETAILS}/${id}`}
                            className="text-decoration-none text-light course-link"
                            data-testid='courseLink'
                            data-testcourseidparam={id}
                          >{name}</Link>
                        </Badge>
                      </div>
                    ))}
                </div>
                </WithLoading>
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
