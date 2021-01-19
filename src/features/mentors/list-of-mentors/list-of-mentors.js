import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchActiveMentors, mentorsActiveSelector } from '@/models';

import { Button, Pagination, Search, WithLoading } from '@/components';
import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-mentors.scss';


const editIcon = (
  <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className={classNames("bi bi-pencil", styles.scale)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
    <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg>
);

const icon1 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
    <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
  </svg>
);

const icon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
  </svg>
);

export const ListOfMentors = () => {
  const history = useHistory();

  const [mentorsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  // const [mentors, setMentors] = useState([]);
  const [sortingCategories, setSortingCategories] = useState([
    {id: 0, name: 'index', sortedByAscending: false, tableHead: "#"},
    {id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name'},
    {id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname'},
    {id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email'},
  ]);

  const { data, isLoading } = useSelector(mentorsActiveSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const loadActiveMentors = useActions(fetchActiveMentors);

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    const mentors = data.filter((mentor) => mentor.firstName.concat(mentor.lastName).toUpperCase()
      .includes(searchMentorValue.toUpperCase()));
    setFilteredMentorList(mentors);
  }, [data, searchMentorValue]);

  const mentorList = () => {
    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

    const mentors = filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor)
      .sort((a, b) => {
        return (a.lastName).toUpperCase() < (b.lastName).toUpperCase() ? -1 : (a.lastName).toUpperCase() > (b.lastName).toUpperCase() ? 1 : 0;
      })
      .map((mentor, index) => {
        return (
          <tr onClick={() => mentorDetails(mentor.id)} key={mentor.id} className={styles.pointer}>
            <td className="text-center">{index + 1}</td>
            <td>{mentor.firstName}</td>
            <td>{mentor.lastName}</td>
            <td>{mentor.email}</td>
            {currentUser.role !== 2 ? <td className="text-center" onClick={(event) => mentorEdit(event, mentor.id) }>{editIcon}</td> : null}
          </tr>
        );
      })

    if (!mentors.length && searchMentorValue) {
      return <tr><td colSpan="5" className="text-center">Mentor is not found</td></tr>;
    }
    return mentors;
  };

  const handleSortByParams = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedMentors = [...filteredMentorList].sort((prevMentor, currentMentor) => {
      if (prevMentor[sortingParam] > currentMentor[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));

    setFilteredMentorList(sortedMentors);
  };

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const mentorDetails = useCallback((id) => {
    history.push(`${paths.MENTORS_DETAILS}/${id}`);
  });

  const mentorEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.MENTOR_EDIT}/${id}`);
  });

  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(data?.length / 5);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  const prevPage =(pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  // <th scope="col" className="text-center">#</th>
  //                     <th scope="col">Name</th>
  //                     <th scope="col">Surname</th>
  //                     <th scope="col">E-mail</th>

  return (
    <div className="container">
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <div className="col-6"><h2>Mentors</h2></div>
        {filteredMentorList.length > 1 ? <span className="col-2 text-right">{filteredMentorList.length} mentors</span> : 
        filteredMentorList.length === 1 ? <div className="col-2 text-right">{filteredMentorList.length} mentor</div> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {filteredMentorList.length > 10 && !isLoading &&
            <Pagination
              itemsPerPage={mentorsPerPage}
              totalItems={filteredMentorList.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          }
          
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-12 shadow p-3 mb-5 bg-white rounded">
            <div className="px-3 py-2 mb-2">
              <div className="row align-items-center">
                <div className="col-2">
                  <button className="btn">{icon1}</button>
                  <button className="btn">{icon2}</button>
                </div>
                <div className="col-4">
                  <Search onSearch={handleSearch} placeholder="Mentor's name" />
                </div>
                <div className="custom-control custom-switch col-2 offset-2">
                  <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                  <label className="custom-control-label" htmlFor="customSwitch1">Disabled Mentors</label>
                </div>
                <div className="col-2">
                  {currentUser.role !== 2 &&
                    <Button onClick={addMentor} className={styles.btn}>
                      <Icon icon="Plus" className="icon" />
                      <span>Add a mentor</span>
                    </Button>
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {sortingCategories.map(({id, name, tableHead, sortedByAscending}) => (
                        <th
                          key={id}
                          onClick={handleSortByParams}
                          data-sorting-param={name}
                          data-sorted-by-ascending={sortedByAscending}
                        >
                          {tableHead}
                        </th>
                      ))}
                      {currentUser.role !== 2 ? <th scope="col" className="text-center">Edit</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mentorList()
                    }
                  </tbody>
                </table>
              </WithLoading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};