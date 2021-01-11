import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { globalLoadStudentGroups, loadStudentById, loadStudentGroups, fetchLessonsByStudentId } from '@/models';
import { Tab, Tabs } from '@/components';
import { EditStudentsDetails, StudentDetails } from '@/features/students';

export const StudentsTabs = ({ index }) => {
  const { id } = useParams();

  const [
    fetchStudentById,
    fetchGroups,
    fetchStudentGroups,
    fetchStudentLessons,
  ] = useActions([
    loadStudentById,
    globalLoadStudentGroups,
    loadStudentGroups,
    fetchLessonsByStudentId,
  ]);

  useEffect(() => {
    fetchStudentById(id);
    fetchGroups();
    fetchStudentGroups(id);
    fetchStudentLessons(id);
  }, [fetchGroups, fetchStudentById, fetchStudentGroups, fetchStudentLessons, id]);

  return (
    <Tabs defaultIndex={index} className="container w-50" linkBack="/students">
      <Tab title="Student details">
        <StudentDetails />
      </Tab>
      <Tab title="Edit student details">
        <EditStudentsDetails id={id} />
      </Tab>
    </Tabs>
  );
};
