import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Search, Button, WithLoading } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-mentors.scss';
import { useActions } from '@/shared/index.js';
import { fetchMentors, mentorsSelector } from '@/models/index.js';

export const ListOfMentors = () => {
  const [loadMentors] = useActions([fetchMentors]);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const {data, isLoading} = useSelector(mentorsSelector, shallowEqual);

  useEffect(() => {
    loadMentors();
  }, [loadMentors]);

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
    history.push(`/mentor/${id}`);
  };
  
  const mentorEditing = (id) => {
    history.push(`/mentors/edit-mentor/${id}`);
  };


  const mentorsList = () => {
    return filteredMentorList.map((mentor) => (
      <Card
        key={mentor.id}
        id={mentor.id}
        buttonName='Details'
        iconName='Edit'
        onEdit={mentorEditing}
        onDetails={mentorDetails}
    >
      <span>{mentor.firstName}</span>
      </Card>
    ));
  };

  return (
  <div className="container">
    <div className="row">
      <div className={classNames(styles.heading, "col-12 mb-3")}>
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