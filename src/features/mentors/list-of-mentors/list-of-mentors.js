import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchMentors, fetchActiveMentors, mentorsSelector, mentorsActiveSelector } from '@/models';

import { Button, Pagination, Search, WithLoading } from '@/components';
import Icon from '@/icon';

import classNames from 'classnames';
import { addAlert } from '@/features/layout';
import styles from './list-of-mentors.scss';

const iconTable = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
    <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z" />
  </svg>
);

const iconCards = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
  </svg>
);

export const ListOfMentors = () => {
  const { 
    data: allMentors, 
    isLoading: areAllMentorsLoading, 
    error: allMentorsError 
  } = useSelector(mentorsSelector, shallowEqual);
  const { 
    data: activeMentors, 
    isLoading: areActiveMentorsLoading, 
    error: activeMentorsError 
  } = useSelector(mentorsActiveSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveMentors, loadAllMentors, dispatchAddAlert] = useActions([fetchActiveMentors, fetchMentors, addAlert]);

  const history = useHistory();

  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [visibleMentors, setVisibleMentors] = useState([]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMentorValue, setSearchMentorValue] = useState('');

  const [mentorsPerPage] = useState(10);
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

  const getDisabledMentors = () => {
    const activeMentorIds = activeMentors.map(({ id }) => id);

    return allMentors.filter(({ id }) => !activeMentorIds.includes(id));
  };

  const searchMentors = (searchedMentors, value) => searchedMentors.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(value.toLowerCase()));

  const getSortedByParam = (data, activeCategory) => {
    const { sortingParam, sortedByAscending } = activeCategory;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    return [...data].sort((prevItem, currentItem) => {
      if (prevItem[sortingParam] > currentItem[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });
  };

  const changeActiveCategory = (categories, activeCategoryName) => categories.map((category) => {
    if (category.name === activeCategoryName) {
      return { ...category, sortedByAscending: !category.sortedByAscending };
    }
    return { ...category, sortedByAscending: false };
  });

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    if (isShowDisabled && allMentors.length && !areAllMentorsLoading) {
      const disabledMentors = getDisabledMentors();

      setFilteredMentorList(disabledMentors.map((mentor, index) => ({ index, ...mentor })));
    }
    if (!isShowDisabled && activeMentors.length && !areActiveMentorsLoading) {
      setFilteredMentorList(activeMentors.map((mentor, index) => ({ index, ...mentor })));
    }
    setSortingCategories(INITIAL_CATEGORIES);
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  },
  [activeMentors, areActiveMentorsLoading, allMentors, areAllMentorsLoading, isShowDisabled]);

  useEffect(() => {
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  }, [currentPage, filteredMentorList]);

  useEffect(() => {
    if (allMentorsError || activeMentorsError) {
      dispatchAddAlert('Mentors loading is failed');
    }
  }, [allMentorsError, activeMentorsError, dispatchAddAlert]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledMentors = getDisabledMentors();
      const searchedMentors = searchMentors(disabledMentors, searchMentorValue);

      setFilteredMentorList(searchedMentors.map((mentor, index) => ({ index, ...mentor })));
    } else {
      const searchedMentors = searchMentors(activeMentors, searchMentorValue);

      setFilteredMentorList(searchedMentors.map((mentor, index) => ({ index, ...mentor })));
    }
    setCurrentPage(1);
  }, [searchMentorValue, isShowDisabled]);

  const mentorList = () => {
    const mentors = visibleMentors
      .map(({ id, index, firstName, lastName, email }) => (
        <tr onClick={() => mentorDetails(id)} key={id} className={styles['table-rows']} data-mentor-id={id}>
          <td className="text-center">{index + 1}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          {currentUser.role !== 2
            ? <td className="text-center" data-mentor-id={id} onClick={(event) => mentorEdit(event, id)}>
                <Icon icon="Edit" className={classNames(styles['edit-icon'], styles.icon)} size={24} />
            </td> : null}
        </tr>
      ));

    if (!mentors.length && searchMentorValue) {
      return <tr><td colSpan="5" className="text-center">Mentor is not found</td></tr>;
    }
    return mentors;
  };

  const handleSortByParam = useCallback((event) => {
    const categoryParams = event.target.dataset;
    const sortedMentors = getSortedByParam(filteredMentorList, categoryParams);

    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setFilteredMentorList(sortedMentors);
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  }, [sortingCategories, filteredMentorList]);

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);

    if (event.target.checked) {
      loadAllMentors();
    } else {
      loadActiveMentors();
    }
  };

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = useCallback(() => {
    history.push(paths.UNASSIGNED_USERS);
  });

  const mentorDetails = useCallback((id) => {
    history.push(`${paths.MENTORS_DETAILS}/${id}`);
  });

  const mentorEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.MENTOR_EDIT}/${id}`);
  });

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(activeMentors?.length / mentorsPerPage);

    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Mentors</h2>
        {filteredMentorList.length > mentorsPerPage && !areAllMentorsLoading && !areActiveMentorsLoading
          ? <span className="col-2 text-right">{filteredMentorList.length} mentors</span> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {filteredMentorList.length > mentorsPerPage && !areActiveMentorsLoading && !areAllMentorsLoading
            && (
            <Pagination
              itemsPerPage={mentorsPerPage}
              totalItems={filteredMentorList.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              page={currentPage}
            />
            )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="card col-12 shadow p-3 mb-5 bg-white rounded">
          <div className="px-3 py-2 mb-2">
            <div className="row align-items-center">
              <div className="col-2">
                <button className="btn">{iconTable}</button>
                <button className="btn">{iconCards}</button>
              </div>
              <div className="col-4">
                <Search onSearch={handleSearch} placeholder="Mentor's name" />
              </div>
              {currentUser.role !== 2
              && (
              <div className="custom-control custom-switch col-2 offset-2">
                <input
                  onClick={handleShowDisabled}
                  type="checkbox"
                  className={classNames('custom-control-input', styles['switch-input'])}
                  id="disabledMentors"
                />
                <label
                  className={classNames('custom-control-label', styles['switch-label'])}
                  htmlFor="disabledMentors"
                >
                  Disabled Mentors
                </label>
              </div>
              )}
              <div className="col-2">
                {currentUser.role !== 2
                  && (
                  <Button onClick={addMentor} className={styles.btn}>
                    <span>Add a mentor</span>
                  </Button>
                  )}
              </div>
            </div>
          </div>
          <WithLoading isLoading={areActiveMentorsLoading || areAllMentorsLoading} className="d-block mx-auto m-0">
            <table className="table table-hover">
              <thead>
                <tr>
                  {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                    <th
                      key={id}
                      className={styles['table-head']}
                    >
                      <span
                        data-sorting-param={name}
                        data-sorted-by-ascending={Number(sortedByAscending)}
                        onClick={handleSortByParam}
                        className={classNames({ [styles.rotate]: !sortedByAscending })}
                      >
                        {tableHead}
                      </span>
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
  );
};
