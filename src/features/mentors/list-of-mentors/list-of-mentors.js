import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared/index.js';
import { fetchActiveMentors, mentorsActiveSelector } from '@/models/index.js';
import { Card, Search, Button, WithLoading } from '@/components/index.js';
import { Pagination } from '@/components/pagination';
import Icon from '@/icon.js';
import styles from './list-of-mentors.scss';

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
          <div className="w-75">
            <span className="mb-2 font-weight-bolder pr-2">{mentor.firstName}</span>
            <span className="font-weight-bolder">{mentor.lastName}</span>
          </div>
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
        <div className="col-md-4 offset-md-4 col-12 text-center">
          <Search onSearch={handleSearch} placeholder="Mentor's name" />
        </div>
        <div className="col-md-4 col-12 text-right">
          <Button onClick={addMentor} variant="warning">
            <Icon icon="Plus" className="icon" />
            <span>Add a mentor</span>
          </Button>
        </div>
      </div>
      <div>
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