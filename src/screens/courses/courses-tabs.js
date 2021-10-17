import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';

import { useActions, paths } from '@/shared';
import { currentUserSelector, fetchActiveCourses, coursesSelector } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({ index }) => {
  const { id } = useParams();
  const loadCourses = useActions(fetchActiveCourses);
  const isCourseEnable = loadCourses.map(({ id }) => id).includes(id);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const coursesData = useSelector(coursesSelector, shallowEqual);

  useEffect(() => {
    if(isCourseEnable){
     loadCourses(); 
    }
    
  }, [loadCourses]);

  if (currentUser.role === 8 || currentUser.role === 4) {
    return (
      <Tabs defaultIndex={index} className="container w-50 pt-5" linkBack={paths.COURSES}>
        <Tab title="Course details">
          <CourseDetails
            id={Number(id)}
            coursesData={coursesData}
          />
        </Tab>
        <Tab title="Edit course details">
          <EditCourse
            id={Number(id)}
            coursesData={coursesData}
          />
        </Tab>
      </Tabs>
    );
  } else {
    return <CourseDetails id={Number(id)} coursesData={coursesData} />
  }
};

CoursesTabs.propTypes = {
  index: number.isRequired,
};
