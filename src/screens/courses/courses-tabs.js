import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditCourse } from '@/features';

export const CoursesTabs = ({index}) => {
  const { id } = useParams();

  return (
    <Tabs defaultIndex={index} className='container w-50' linkBack='courses'>
      <Tab title='Course details'>
        <CourseDetails id={id}/>
      </Tab>
      <Tab title='Edit course details'>
        <EditCourse id={id}/>
      </Tab>
    </Tabs>
  );
}