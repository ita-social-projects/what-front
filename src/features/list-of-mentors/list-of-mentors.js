import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-mentors.scss';
import { dataList } from './mentors-dataList.js';

export const ListOfMentors = () => {
    const [searchMentorValue, setSearchMentorValue] = useState('');
    const [filteredMentorList, setFilteredMentorList] = useState([]);
  
    useEffect(() => {
      const mentors = dataList.filter((mentor) => mentor.name.toUpperCase()
        .includes(searchMentorValue.toUpperCase()));
        setFilteredMentorList(mentors);
    }, [searchMentorValue]);
  
    const handleSearch = (inputValue) => {
      setSearchMentorValue(inputValue);
    };

    const addMentor = () => {
    };
    const mentorDetails = (id) => {
    };
    const mentorEditing = (id) => {
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
        <span>{mentor.name}</span> 
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
          <Button onClick={addMentor} variant="warning" className={styles.button}>
            <Icon icon="Plus" className="icon" />
            Add a Mentor
          </Button>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          {
            mentorsList()
          }
        </div>
      </div>
    </div>
    )
};