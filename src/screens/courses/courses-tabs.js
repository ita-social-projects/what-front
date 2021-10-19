import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';

import { useActions, paths } from '@/shared';
import { currentUserSelector, fetchActiveCourses, coursesActiveSelector, fetchNotActiveCourses, coursesNotActiveSelector } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({ index }) => {
  const page = useLocation();
  const { id } = useParams();
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const loadActiveCourses = useActions(fetchActiveCourses);
  const coursesActiveData = useSelector(coursesActiveSelector, shallowEqual);
  const loadNotActiveCourses = useActions(fetchNotActiveCourses);
  const coursesNotActiveData = useSelector(coursesNotActiveSelector, shallowEqual);

  const isCourseEnable = coursesActiveData.data.map(({ id }) => id).includes(Number(id));
  
  useEffect(() => {
    loadActiveCourses();
  }, [loadActiveCourses]);

  useEffect(() => {
    loadNotActiveCourses();
  }, [loadNotActiveCourses]);

  if (currentUser.role === 8 || currentUser.role === 4) {
    if(isCourseEnable){
      return (
        <Tabs defaultIndex={index} className="container w-50 pt-5" linkBack={paths.COURSES}>
          <Tab title="Course details">
            <CourseDetails
              id={Number(id)}
              coursesData={coursesActiveData}
            />
          </Tab>
          <Tab title="Edit course details">
            <EditCourse
              id={Number(id)}
              coursesData={coursesActiveData}
            />
          </Tab>
        </Tabs>
      );
    }
    else{
      return (
        <Tabs defaultIndex={index} className="container w-50 pt-5" linkBack={paths.COURSES}>
          <Tab title="Course details">
            <CourseDetails
              id={Number(id)}
              coursesData={coursesNotActiveData}
            />
          </Tab>
          <Tab title="Edit course details">
            <EditCourse
              id={Number(id)}
              coursesData={coursesNotActiveData}
            />
          </Tab>
        </Tabs>
      );
    }
    
  } else {
    if(isCourseEnable){
      return <CourseDetails id={Number(id)} coursesData={coursesActiveData} />
    }
    else{
      return <CourseDetails id={Number(id)} coursesData={coursesNotActiveData} />
    }    
  }
};

CoursesTabs.propTypes = {
  index: number.isRequired,
};