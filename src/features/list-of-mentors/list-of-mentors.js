import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Search, Button, WithLoading } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-mentors.scss';
import { useActions } from '@/shared/index.js';
import { fetchActiveMentors, mentorsActiveSelector } from '@/models/index.js';


export const ListOfMentors = () => {
  const [loadActiveMentors] = useActions([fetchActiveMentors]);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const {data, isLoading} = useSelector(mentorsActiveSelector, shallowEqual);

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    const mentors = data.filter((mentor) => mentor.firstName.toUpperCase()
      .includes(searchMentorValue.toUpperCase()));
      setFilteredMentorList(mentors);
  }, [data, searchMentorValue]);

  const history = useHistory();
  
  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = () => {
  };
  
  const mentorDetails = (id) => {
    history.push(`/mentors/mentor-tabs/${id}`);
  };
  
  const mentorEditing = (id) => {
    history.push(`/mentors/mentor-tabs/${id}`);
  };


  const mentorsList = () => {
   const mentors = filteredMentorList.map((mentor) => (
      <Card
        key={mentor.id}
        id={mentor.id}
        buttonName='Details'
        iconName='Edit'
        onEdit={() => mentorEditing(mentor.id)}
        onDetails={() => mentorDetails(mentor.id)}
    >
      <span className="mb-2">{mentor.firstName}</span>
        <span className="pl-2">{mentor.lastName}</span>
        <p>{mentor.email}</p>
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
      <div className={classNames(styles.heading, "col-12 mb-2")}>
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
  )
};