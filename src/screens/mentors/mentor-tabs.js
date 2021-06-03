import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '../../shared/index.js';
import { fetchMentorById, fetchMentorGroups, fetchMentorCourses, currentUserSelector } from '@/models';
import { Tabs, Tab } from '../../components/index.js';
import { EditMentor, MentorDetails } from '../../features/index.js';

export const MentorTabs = ({ index }) => {
  const { id } = useParams();

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

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

  if (currentUser.role !== 2) {
    return (
      <Tabs defaultIndex={index} linkBack={paths.MENTORS} className="container w-50">
        <Tab title="Mentor details">
          <MentorDetails />
        </Tab>
        <Tab title="Edit a mentor">
          <EditMentor id={Number(id)} />
        </Tab>
      </Tabs>
    );
  } else {
    return <MentorDetails id={Number(id)}/>
  }
};