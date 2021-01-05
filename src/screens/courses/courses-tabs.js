import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { currentUserSelector, fetchCourses } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({ index }) => {
  const { id } = useParams();

  const [loadCourses] = useActions([fetchCourses]);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  if (currentUser.role === 3 || currentUser.role === 4) {
    return (
      <Tabs defaultIndex={index} className="container w-50" linkBack={paths.COURSES}>
        <Tab title="Course details">
          <CourseDetails id={id} />
        </Tab>
        <Tab title="Edit course details">
          <EditCourse id={id} />
        </Tab>
      </Tabs>
    );
  } else {
    return <CourseDetails id={id}/>
  }
};
