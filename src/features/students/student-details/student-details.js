import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { WithLoading } from '@/components';
import { currentStudentGroupsSelector, currentStudentSelector } from '@/models';
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
    isLoaded: areStudentGroupsLoaded,
    error: studentGroupsError,
  } = useSelector(currentStudentGroupsSelector, shallowEqual);

  useEffect(() => {
    if (studentError && studentGroupsError) {
      history.push(paths.NOT_FOUND);
    }
  }, [studentError, studentGroupsError]);

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
                <div className="col-12 col-md-6"><span>{student?.firstName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Last name: </span></div>
                <div className="col-12 col-md-6 "><span>{student?.lastName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Email: </span></div>
                <div className="col-12 col-md-6 "><span>{student?.email}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Group('s): </span></div>
                <WithLoading
                  isLoading={areStudentGroupsLoading}
                  className={styles['loader-centered']}
                >
                  <div className="col-12 col-md-6">
                    {studentGroups
                      .map(({ id, name }) => <div className="pb-2" key={id}>{name}</div>)}
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