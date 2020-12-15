import { WithLoading } from '@/components';
import { activeStudentsSelector } from '@/models';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styles from './student-details.scss';

export const StudentDetails = ({id}) => {
  const { 
    data: students,
    isLoading,
    isLoaded: areStudentsLoaded,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const student = students.find((student) => student.id == id);
  student.groups = [
    { id: 5, name: 'Griffindor', startDate: "2018-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 5, studentIds: [20,19,18,17,29,16], mentorIds: [11,4,6,5] },
    { id: 6, name: '122_17_1', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 6, studentIds: [21,22,25,23,24], mentorIds: [] },
    { id: 7, name: '122_17_2', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 7, studentIds: [21,22,25,23,24], mentorIds: [10,5,2,15] },
    { id: 8, name: '122_17_3', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 8, studentIds: [21,22,25,23,24], mentorIds: [12,8,3,6] },
  ];
  student.courses = [
    { id: 5, name: 'Griffindor', startDate: "2018-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 5, studentIds: [20,19,18,17,29,16], mentorIds: [11,4,6,5] },
    { id: 6, name: '122_17_1', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 6, studentIds: [21,22,25,23,24], mentorIds: [] },
    { id: 7, name: '122_17_2', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 7, studentIds: [21,22,25,23,24], mentorIds: [10,5,2,15] },
    { id: 8, name: '122_17_3', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 8, studentIds: [21,22,25,23,24], mentorIds: [12,8,3,6] },
  ];

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-sm-12 card shadow'>
          <div className='px-2 py-4'>
            <h3>Student Details</h3>
            <hr />
            <WithLoading isLoading={isLoading} className={styles['loader-centered']}>
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
                <div className='col-12 col-md-6'>{student.groups.map(({id, name}) => <div className='pb-1' key={id}>{name}</div>)}</div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 font-weight-bolder'><span>Course('es): </span></div>
                <div className='col-12 col-md-6'>{student.courses.map(({id, name}) => <div className='pb-1' key={id}>{name}</div>)}</div>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};