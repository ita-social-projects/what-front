import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

import { paths } from '@/shared';
import { WithLoading } from '@/components';
import { Badge } from 'react-bootstrap';
import { currentStudentGroupsSelector, currentStudentSelector, studentLessonsSelector } from '@/models';
import styles from './student-details.scss';

export const StudentDetails = () => {
  const history = useHistory();
  const {
    data: student,
    isLoading: isStudentLoading,
    isLoaded: isStudentLoaded,
    error: studentError,
  } = useSelector(currentStudentSelector, shallowEqual);
  
  const {
      data: studentGroups,
      isLoading: areStudentGroupsLoading,
    } = useSelector(currentStudentGroupsSelector, shallowEqual);
    
    const {
      data: studentLessons,
      isLoading: studentLessonsIsLoading,
      isLoaded: studentLessonsIsLoaded,
    } = useSelector(studentLessonsSelector, shallowEqual);

  useEffect(() => {
    if (studentError && !isStudentLoading) {
      history.push(paths.NOT_FOUND);
    }
  }, [history, isStudentLoading, studentError]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12 card shadow">
          <div className="px-2 py-4">
            <h3>Student Details</h3>
            <hr />
            <WithLoading
              isLoading={isStudentLoading || !isStudentLoaded}
              className={styles['loader-centered']}
            >
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>First name: </span></div>
                <div className="col-12 col-md-6"><span data-testid='firstName'>{student?.firstName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Last name: </span></div>
                <div className="col-12 col-md-6 "><span data-testid='lastName'>{student?.lastName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Email: </span></div>
                <div className="col-12 col-md-6 "><span data-testid='email'>{student?.email}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Group(s): </span></div>
                <WithLoading
                  isLoading={areStudentGroupsLoading}
                  className={styles['loader-centered']}
                >
                  <div className="col-12 col-md-6 d-flex flex-wrap lead">
                    {studentGroups
                      .map(({ id, name }) => (
                        <div className="pr-2" key={id}>
                          <Badge pill variant="info">
                            <Link
                              to={`${paths.GROUPS_DETAILS}/${id}`}
                              className="text-decoration-none text-white"
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
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Lesson(s): </span></div>
                <WithLoading
                  isLoading={studentLessonsIsLoading || !studentLessonsIsLoaded}
                  className={styles['loader-centered']}
                >
                  <div className="col-12 col-md-6 d-flex flex-wrap lead">
                    {studentLessons
                      .map(({ id, themeName }) => (
                        <div className="pr-2" key={id}>
                          <Badge pill variant="info">
                            <Link
                              to={`${paths.LESSON_DETAILS}/${id}`}
                              className="text-decoration-none text-white"
                              data-testid='lessonLink'
                              data-testlessonidparam={id}
                            >{themeName}
                            </Link>
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
