import React from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import { actions, searchMentorValue } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import styles from './list-of-mentors.scss';
import { dataList } from './mentors-dataList.js';

export const ListOfMentors = () => {
  // Search input
  const { setSearchMentorValue } = useActions(actions);
  const searchMentorName = useSelector(searchMentorValue, shallowEqual);

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  // Add a Student
  const addMentor = () => {
  };

  // Student's details
  const cardDetails = (id) => {
  };

  // Edit Student's details
  const cardEditing = (id) => {
  };

  const mentorsList = () => {
    const listByMentorName = dataList.filter((mentor) => mentor.name.toUpperCase()
      .includes(searchMentorName.toUpperCase()));

    return listByMentorName.map((mentor) => (
      <Card
        key={mentor.uuid}
        id={mentor.uuid}
        button="Details"
        onEdit={cardEditing}
        onDetails={cardDetails}
      > { mentor.name }
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-3')}>
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
          {
            mentorsList()
          }
        </div>
      </div>
    </div>
  );
};