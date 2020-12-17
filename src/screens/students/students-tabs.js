import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { globalLoadStudentGroups, loadStudentById, loadStudentGroups } from '@/models';
import { Tab, Tabs } from '@/components';
import { EditStudentsDetails, StudentDetails } from '@/features';

export const StudentsTabs = ({index}) => {
  const { id } = useParams();

  const [
    fetchStudentById, 
    fetchGroups, 
    fetchStudentGroups,
  ] = useActions([loadStudentById, globalLoadStudentGroups, loadStudentGroups]);

  useEffect(() => {
    fetchStudentById(id);
    fetchGroups();
    fetchStudentGroups(id);
  }, [fetchStudentById, fetchStudentGroups, fetchGroups]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <Tabs defaultIndex={index} className='container w-50' linkBack='/students'>
      <Tab title='Student details'>
        <StudentDetails id={id}/>
      </Tab>
      <Tab title='Edit student details'>
        <EditStudentsDetails id={id} />
      </Tab>
    </Tabs>
  );
}