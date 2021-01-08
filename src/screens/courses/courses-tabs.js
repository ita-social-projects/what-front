import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';

import { useActions, paths } from '@/shared';
import { coursesSelector, fetchCourses } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({ index }) => {
  const { id } = useParams();
  const [loadCourses] = useActions([fetchCourses]);

  const coursesData = useSelector(coursesSelector, shallowEqual);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <Tabs defaultIndex={index} className="container w-50" linkBack={paths.COURSES}>
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
};

CoursesTabs.propTypes = {
  index: number.isRequired,
};
