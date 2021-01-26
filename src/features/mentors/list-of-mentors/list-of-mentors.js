import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchMentors, fetchActiveMentors, mentorsSelector, mentorsActiveSelector } from '@/models';

import { Button, Pagination, Search, WithLoading } from '@/components';
import { addAlert } from '@/features/layout';

import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-mentors.scss';

export const ListOfMentors = () => {
  const history = useHistory();

  const [mentorsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchMentorValue, setSearchMentorValue] = useState('');

  const [filteredMentorList, setFilteredMentorList] = useState([]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ]);

  const [visibleMentors, setVisibleMentors] = useState([]);
  const [isShowDisabled, setIsShowDisabled] = useState(false);

  const { data: allMentors, isLoading: areAllMentorsLoading, error: allMentorsError } = useSelector(mentorsSelector, shallowEqual);
  const { data: activeMentors, isLoading: areActiveMentorsLoading, error: activeMentorsError } = useSelector(mentorsActiveSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveMentors, loadAllMentors, dispatchAddAlert] = useActions([fetchActiveMentors, fetchMentors, addAlert]);

  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

  const getDisabledMentors = () => {
    const activeMentorIds = activeMentors.map(({ id }) => id);

    return allMentors.filter(({ id }) => !activeMentorIds.includes(id));
  };

  const searchMentors = (searchedMentors) => searchedMentors.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(searchMentorValue.toLowerCase()));

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    if (allMentorsError || activeMentorsError) {
      dispatchAddAlert('Mentors loading is failed');
    }
  }, [allMentorsError, activeMentorsError, dispatchAddAlert]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledMentors = getDisabledMentors();

      setFilteredMentorList(disabledMentors.map((mentor, index) => ({ index, ...mentor })));
    }
    if (!isShowDisabled && activeMentors.length && !areActiveMentorsLoading) {
      setFilteredMentorList(activeMentors.map((mentor, index) => ({ index, ...mentor })));
    }

    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  },
  [activeMentors, areActiveMentorsLoading, allMentors, areAllMentorsLoading, isShowDisabled]);

  useEffect(() => {
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  }, [currentPage, filteredMentorList]);

  useEffect(() => {
    setCurrentPage(1);
    if (isShowDisabled) {
      const disabledMentors = getDisabledMentors();
      const searchedMentors = searchMentors(disabledMentors);

      setFilteredMentorList(searchedMentors.map((mentor, index) => ({ index, ...mentor })));
    } else {
      const searchedMentors = searchMentors(activeMentors);

      setFilteredMentorList(searchedMentors.map((mentor, index) => ({ index, ...mentor })));
    }
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
            && (
            <td
              className="text-center"
              onClick={(event) => mentorEdit(event, id)}
              data-mentor-id={id}
            >
              <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30} />
            </td>
            )}
        </tr>
      ));

    if (!mentors.length && searchMentorValue) {
      return <tr><td colSpan="5" className="text-center">Mentor is not found</td></tr>;
    }
    return mentors;
  };

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedMentors = [...visibleMentors].sort((prevMentor, currentMentor) => {
      if (prevMentor[sortingParam] > currentMentor[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));

    setVisibleMentors(sortedMentors);
  };

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
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled><Icon icon="List" color="#2E3440" size={25} /></button>
                <button type="button" className="btn btn-outline-secondary" disabled><Icon icon="Card" color="#2E3440" size={25} /></button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Mentor's name" />
            </div>
            {currentUser.role !== 2
              && (
              <div className="custom-control custom-switch col-2 offset-3">
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
            <div className="col-2 text-right">
              {currentUser.role !== 2
                  && (
                  <Button onClick={addMentor}>
                    <span>Add a mentor</span>
                  </Button>
                  )}
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
