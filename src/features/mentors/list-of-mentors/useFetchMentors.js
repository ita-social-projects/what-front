import { useState, useEffect } from 'react';

import useFetch from 'use-http';

import { Cookie } from '@/utils';

export function useFetchMentors() {
  const jwt = Cookie.get('jwt');
  const { get, response, loading, error } = useFetch(
    'https://whatbackend.azurewebsites.net/api/v2',
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const [allMentors, setAllMentors] = useState([]);
  const [activeMentors, setActiveMentors] = useState([]);
  const [disabledMentors, setDisabledMentors] = useState([]);

  useEffect(() => {
    loadAllMentors();
    loadActiveMentors();
  }, []);

  useEffect(() => {
    if (response.ok && !loading && !error) {
      const activeMentorIds = activeMentors.map(({ id }) => id);
      const disabledMentors = allMentors.filter(
        ({ id }) => !activeMentorIds.includes(id)
      );
      setDisabledMentors(disabledMentors);
    }
  }, [allMentors, activeMentors]);

  async function loadAllMentors() {
    const mentors = await get('/mentors');
    if (response.ok) {
      setAllMentors(mentors);
    }
  }
  async function loadActiveMentors() {
    const mentors = await get('/mentors/active');
    if (response.ok) {
      setActiveMentors(mentors);
    }
  }

  return { loading, error, allMentors, activeMentors, disabledMentors };
}
