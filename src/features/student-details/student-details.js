import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { WithLoading } from '@/components';
import { activeStudentsSelector, coursesSelector, loadStudentGroupsSelector } from '@/models';
import styles from './student-details.scss';

export const StudentDetails = ({id}) => {
  const { 
    data: students, 
    isLoading: areStudentsLoading, 
    isLoaded: areStudentsLoaded,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const {
    data: courses,
    isLoading: areCoursesLoading,
    loaded: areCoursesLoaded,
  } = useSelector(coursesSelector, shallowEqual);
  
  const {
    data: groups,
    isLoading: areGroupsLoading,
    isLoaded: areGroupsLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const student = students.find((student) => student.id == id);
  
  const history = useHistory();

  useEffect(() => {
    if (!student && areStudentsLoaded) {
      history.push('/404');
    }
  }, [student, areStudentsLoaded]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12 card shadow">
          <div className="px-2 py-4">
            <h3>Student Details</h3>
            <hr />
            <WithLoading isLoading={areStudentsLoading || !areStudentsLoaded} 
              className={styles["loader-centered"]}
            >
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>First name: </span></div>
                <div className="col-12 col-md-6"><span>{student?.firstName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Last name: </span></div>
                <div className="col-12 col-md-6"><span>{student?.lastName}</span></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Email: </span></div>
                <div className="col-12 col-md-6"><span>{student?.email}</span></div>
              </div>
              <hr />
                <div className="row">
                  <div className="col-12 col-md-6 font-weight-bolder"><span>Group('s): </span></div>
                  <WithLoading isLoading={areGroupsLoading || !areGroupsLoaded}
                    className={styles["loader-centered"]}
                  >
                    <div className="col-12 col-md-6">
                      {groups
                        .filter((group) => student.groupsIds?.includes(group.id))
                        .map(({id, name}) => <div className='pb-2' key={id}>{name}</div>)
                      }
                    </div>
                  </WithLoading>
                </div>
              <hr />
                <div className="row">
                  <div className="col-12 col-md-6 font-weight-bolder"><span>Course('es): </span></div>
                  <WithLoading isLoading={areCoursesLoading || !areCoursesLoaded}
                    className={styles["loader-centered"]}
                  >
                    <div className="col-12 col-md-6">
                      {courses
                        .filter((course) => student.coursesIds?.includes(course.id))
                        .map(({id, name}) => <div className="pb-2" key={id}>{name}</div>)
                      }
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