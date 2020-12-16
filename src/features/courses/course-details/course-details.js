import React from 'react';
import { coursesSelector } from '../../../models';
import { shallowEqual, useSelector } from 'react-redux';
import { WithLoading } from '../../../components';
import styles from './course-details.scss';

export const CourseDetails = ({id}) => {
  const { data, isLoading } = useSelector(coursesSelector, shallowEqual);

  const course = data.find((course) => course.id == id);
  
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-sm-12 card shadow'>
          <div className='px-2 py-4'>
            <h3>Course Details</h3>
            <hr />
            <WithLoading isLoading={isLoading} className={styles['loader-centered']}>
              <div className='row'>
                <div className='col-12 col-md-6'><span>Course name: </span></div>
                <div className='col-12 col-md-6'><span>{course?.name}</span></div>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};