import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared/index.js';
import { currentUserSelector, fetchActiveMentors, mentorsActiveSelector } from '@/models/index.js';
import { Card, Search, Button, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';

export const ListOfMentors = () => {
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(9);

  const { data, isLoading } = useSelector(mentorsActiveSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveMentors] = useActions([fetchActiveMentors]);

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
      .map((mentor) => {
        return (
          <Card
            key={mentor.id}
            id={mentor.id}
            buttonName="Details"
            iconName={currentUser.role !== 2 ? "Edit" : null}
            onEdit={currentUser.role !== 2 ? () => mentorEditing(mentor.id) : null}
            onDetails={() => mentorDetails(mentor.id)}
          >
            <div className="w-75">
              <p className="mb-2 pr-2">{mentor.firstName}</p>
              <p>{mentor.lastName}</p>
            </div>
          </Card>
        );
      });

    if (!mentors.length && searchMentorValue) {
      return <h4>Mentor is not found</h4>;
    }
    return mentors;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" style={{minHeight: 750}}>
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center">
          <Search onSearch={handleSearch} placeholder="Mentor's name" />
        </div>
        {currentUser.role !== 2 && 
          <div className="col-md-4 text-right">
            <Button onClick={addMentor} variant="warning">
              <Icon icon="Plus" className="icon" />
              <span>Add a mentor</span>
            </Button>
          </div>
        } 
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
      {filteredMentorList.length > 9 && !isLoading &&
        <Pagination 
          itemsPerPage={mentorsPerPage} 
          totalItems={filteredMentorList.length} 
          paginate={paginate}
        />
      }
    </div>
  );
};