import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, paths } from '@/shared';
import { coursesSelector, fetchCourses } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';
import { shallowEqual, useSelector } from 'react-redux';

export const CoursesTabs = ({ index }) => {
  const { id } = useParams();

  const [loadCourses] = useActions([fetchCourses]);

  const coursesData = useSelector(coursesSelector, shallowEqual);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <Tabs defaultIndex={index} className="container w-50" linkBack={paths.COURSES}>
      <Tab title="Course details">
        <CourseDetails
          id={id}
          coursesData={coursesData}
        />
      </Tab>
      <Tab title="Edit course details">
        <EditCourse
          id={id}
          coursesData={coursesData}
        />
      </Tab>
    </Tabs>
  );
};
