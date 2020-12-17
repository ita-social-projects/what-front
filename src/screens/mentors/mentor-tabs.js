import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useActions } from '../../shared/index.js';
import { fetchMentorById, fetchMentorGroups, fetchMentorGroups} from "@/models";
import { Tabs, Tab } from '../../components/index.js';
import { EditMentor, MentorDetails } from '../../features/index.js';

export const MentorTabs = ({idx}) => {
  const { id } = useParams();
  
  const [loadMentor] = useActions([fetchMentorById]);
  const [loadMentorGroups] = useActions([fetchMentorGroups]);
  const [loadMentorCourses] = useActions([fetchMentorGroups]);
  
  useEffect(() => {
    loadMentor(id);
  }, [loadMentor]);
  
  useEffect(() => {
    loadMentorGroups(id);
  }, [loadMentorGroups]);
  
  useEffect(() => {
    loadMentorCourses(id);
  }, [loadMentorCourses]);
  
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