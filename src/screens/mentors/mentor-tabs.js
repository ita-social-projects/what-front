import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMentorById, fetchMentorGroups, fetchMentorCourses } from '@/models';
import { paths, useActions } from '../../shared/index.js';
import { Tabs, Tab } from '../../components/index.js';
import { EditMentor, MentorDetails } from '../../features/index.js';

export const MentorTabs = ({ index }) => {
  const { id } = useParams();

  const [
    loadMentor,
    loadMentorGroups,
    loadMentorCourses,
  ] = useActions([fetchMentorById, fetchMentorGroups, fetchMentorCourses]);

  useEffect(() => {
    loadMentor(id);
    loadMentorGroups(id);
    loadMentorCourses(id);
  }, [loadMentor, loadMentorGroups, loadMentorCourses]);

  return (
    <Tabs defaultIndex={index} linkBack={paths.MENTORS} className="container w-50">
      <Tab title="Mentor details">
        <MentorDetails id={Number(id)} />
      </Tab>
      <Tab title="Edit a mentor">
        <EditMentor id={Number(id)} />
      </Tab>
    </Tabs>
  );
};