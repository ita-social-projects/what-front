import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';
import React from 'react';
import { useParams } from 'react-router-dom';

export const CoursesTabs = ({index}) => {
  const { id } = useParams()

  return (
    <Tabs defaultIndex={index} className='container w-50 mt-4' linkBack='courses'>
      <Tab title='Course details'>
        <CourseDetails id={id}/>
      </Tab>
      <Tab title='Edit course details'>
        <EditCourse id={id}/>
      </Tab>
    </Tabs>
  );
}