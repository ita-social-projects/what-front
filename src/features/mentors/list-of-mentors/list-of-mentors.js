import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
<<<<<<< HEAD:src/features/mentors/list-of-mentors/list-of-mentors.js
import { Card, Search, Button, WithLoading } from '@/components/index.js';
import Icon from '@/icon.js';
import styles from './list-of-mentors.scss';
=======
>>>>>>> dev:src/features/list-of-mentors/list-of-mentors.js
import { useActions } from '@/shared/index.js';
import { fetchActiveMentors, mentorsActiveSelector } from '@/models/index.js';
import {
  Card, Search, Button, WithLoading,
} from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-mentors.scss';

export const ListOfMentors = () => {
  const [loadActiveMentors] = useActions([fetchActiveMentors]);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const { data, isLoading } = useSelector(mentorsActiveSelector, shallowEqual);

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    const mentors = data.filter((mentor) => mentor.firstName.concat(mentor.lastName).toUpperCase()
      .includes(searchMentorValue.toUpperCase()));
    setFilteredMentorList(mentors);
  }, [data, searchMentorValue]);

  const history = useHistory();

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = () => {
    history.push('/add-role');
  };

  const mentorDetails = (id) => {
    history.push(`/mentors/${id}`);
  };

  const mentorEditing = (id) => {
    history.push(`/mentors/edit/${id}`);
  };

  const mentorsList = () => {
    const mentors = filteredMentorList.map((mentor) => (
      <Card
        key={mentor.id}
        id={mentor.id}
        buttonName="Details"
        iconName="Edit"
        onEdit={() => mentorEditing(mentor.id)}
        onDetails={() => mentorDetails(mentor.id)}
      >
        <span className="mb-2 font-weight-bolder">{mentor.firstName}</span>
        <span className="pl-2 font-weight-bolder">{mentor.lastName}</span>
        <p className="font-weight-lighter font-italic small mt-2"><u>{mentor.email}</u></p>
      </Card>
    ));

    if (!mentors.length && searchMentorValue) {
      return <h4>Mentor is not found</h4>;
    }
    return mentors;
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-2')}>
          <div className={styles.search__container}>
            <Search onSearch={handleSearch} placeholder="Enter a mentor's name" />
          </div>
          <Button onClick={addMentor} variant="warning">
            <Icon icon="Plus" className="icon" />
            Add a Mentor
          </Button>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
            mentorsList()
          }
          </WithLoading>
        </div>
      </div>
    </div>
  );
};