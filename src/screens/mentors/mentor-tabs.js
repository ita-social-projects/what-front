import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useActions } from '../../shared/index.js';
import { fetchMentorById, fetchMentorGroups, fetchMentorCourses} from "@/models";
import { Tabs, Tab } from '../../components/index.js';
import { EditMentor, MentorDetails } from '../../features/index.js';

export const MentorTabs = ({idx}) => {
  const { id } = useParams();
  
  const [
    loadMentor,
    loadMentorGroups,
    loadMentorCourses
  ] = useActions([fetchMentorById, fetchMentorGroups, fetchMentorCourses]);
  
  useEffect(() => {
    loadMentor(id);
    loadMentorGroups(id);
    loadMentorCourses(id);
  }, [loadMentor, loadMentorGroups, loadMentorCourses]);
  
  return (
    <Tabs defaultIndex={idx} linkBack="/mentors" className="container w-50">
      <Tab title="Mentor details" tabIndex={0}>
        <MentorDetails id={Number(id)}/>
      </Tab>
      <Tab title="Edit a mentor" tabIndex={1}>
        <EditMentor
          id={Number(id)}/>
      </Tab>
    </Tabs>
  );
};