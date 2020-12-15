import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { WithLoading } from '@/components';
import { activeStudentsSelector } from '@/models';
import styles from './student-details.scss';

export const StudentDetails = ({id}) => {
  const { data, isLoading, isLoaded} = useSelector(activeStudentsSelector, shallowEqual);

  const student = data.find((student) => student.id == id);
  
  const history = useHistory();

  useEffect(() => {
    if (!student && isLoaded) {
      history.push('/404');
    }
  }, [student, isLoaded]);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-sm-12 card shadow'>
          <div className='px-2 py-4'>
            <h3>Student Details</h3>
            <hr />
            <WithLoading isLoading={isLoading || !isLoaded} className={styles['loader-centered']}>
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>First name: </span></div>
                <div className='col-12 col-md-6'><span>{student?.firstName}</span></div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>Last name: </span></div>
                <div className='col-12 col-md-6'><span>{student?.lastName}</span></div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>Email: </span></div>
                <div className='col-12 col-md-6'><span>{student?.email}</span></div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>Group('s): </span></div>
                <div className='col-12 col-md-6'>{student.groups.map(({id, name}) => <div className='pb-2' key={id}>{name}</div>)}</div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>Course('es): </span></div>
                <div className='col-12 col-md-6'>{student.courses.map(({id, name}) => <div className='pb-2' key={id}>{name}</div>)}</div>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};