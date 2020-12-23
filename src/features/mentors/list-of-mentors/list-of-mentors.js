import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Search, Button, WithLoading } from '@/components/index.js';
import Icon from '@/icon.js';
import { paths, useActions } from '@/shared/index.js';
import { fetchActiveMentors, mentorsActiveSelector } from '@/models/index.js';
import styles from './list-of-mentors.scss';
import { Pagination } from '@/components/pagination';

export const ListOfMentors = () => {
  const [loadActiveMentors] = useActions([fetchActiveMentors]);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(12);
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
    history.push(paths.UNASSIGNED_USERS);
  };

  const mentorDetails = (id) => {
    history.push(`${paths.MENTORS_DETAILS}/${id}`);
  };

  const mentorEditing = (id) => {
    history.push(`${paths.MENTOR_EDIT}/${id}`);
  };

  const mentorsList = () => {
    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

    const mentors = filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor)
      .map((mentor) => (
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classNames("container", styles['list-wrapper'])}>
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
      <Pagination itemsPerPage={mentorsPerPage} totalItems={filteredMentorList.length} paginate={paginate}/>
    </div>
  );
};
