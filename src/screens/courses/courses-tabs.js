import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, paths } from '@/shared';
import { fetchCourses } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({ index }) => {
  const { id } = useParams();

  const [loadCourses] = useActions([fetchCourses]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

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
};
