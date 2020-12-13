import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { fetchActiveMentors } from '@/models';
import { Tabs, Tab } from '../../components/index.js';
import { EditMentor, MentorDetails } from '../../features/index.js';

export const MentorTabs = () => {
  const [loadMentors] = useActions([fetchActiveMentors]);
  const { id } = useParams();

  useEffect(() => {
    loadMentors();
  }, [loadMentors]);

  return (
    <Tabs defaultIndex={0} linkBack="/mentors" className="container w-100">
      <Tab title="Mentor details" tabIndex={0}>
        <MentorDetails id={Number(id)} />
      </Tab>
      <Tab title="Edit a mentor" tabIndex={1}>
        <EditMentor id={Number(id)} />
      </Tab>
    </Tabs>
  );
};