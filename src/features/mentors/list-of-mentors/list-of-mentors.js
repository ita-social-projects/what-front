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
import {List} from "@components/list";
import { Table } from '@components/table';
export const ListOfMentors = () => {
  const {
    data: allMentors,
    isLoading: areAllMentorsLoading,
    error: allMentorsError,
  } = useSelector(mentorsSelector, shallowEqual);
  const {
    data: activeMentors,
    isLoading: areActiveMentorsLoading,
    error: activeMentorsError,
  } = useSelector(mentorsActiveSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveMentors, loadAllMentors, dispatchAddAlert] = useActions([fetchActiveMentors, fetchMentors, addAlert]);

  const history = useHistory();

  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [visibleMentors, setVisibleMentors] = useState([]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 1, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 2, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [showBlocks, setShowBlocks] = useState(false);

  const [mentorsPerPage, setMentorsPerPage] = useState(9);
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

  const getDisabledMentors = () => {
    const activeMentorIds = activeMentors.map(({ id }) => id);

    return allMentors.filter(({ id }) => !activeMentorIds.includes(id));
  };

  const searchMentors = (searchedMentors, value) => searchedMentors.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(value.toLowerCase()));

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
      .map(({ id, firstName, lastName, email }) => (
        <tr onClick={() => mentorDetails(id)} key={id} className={styles['table-rows']} data-mentor-id={id}>
          <td className="text-left">{firstName}</td>
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

  const handleSortByParam = (data, categoryParams) => {
    const sortedMentors = data;
    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setFilteredMentorList(sortedMentors);
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
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
  }, [history]);

  const handleDetails = useCallback((id) => {
    history.push(`${paths.MENTORS_DETAILS}/${id}`);
  }, [history]);

  const handleEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.MENTOR_EDIT}/${id}`);
  }, [history]);

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

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleMentors(filteredMentorList.slice(start, finish));
    setMentorsPerPage(newNumber);
  };

  const listProps = {
    data: visibleMentors,
    handleDetails,
    handleEdit,
    errors: [{
      message: 'Mentor is not found',
      check: [!visibleMentors.length && !!searchMentorValue]
    }],
    access: currentUser.role !== 2,
    fieldsToShow: ['firstName', 'lastName', 'email', 'edit']
  };

  const paginationComponent = () => {
    if (filteredMentorList.length < mentorsPerPage) {
      return (
        <Pagination
          itemsPerPage={mentorsPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={mentorsPerPage}
        totalItems={filteredMentorList.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Mentors</h2>
        { !areAllMentorsLoading && !areActiveMentorsLoading
          ? <span className="col-2 text-right">{visibleMentors.length} of {filteredMentorList.length} mentors</span> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button"
                        className="btn btn-secondary"
                        disabled={!showBlocks}
                        onClick={() => setShowBlocks(false)}>
                  <Icon icon="List" color="#2E3440" size={25}/>
                </button>
                <button type="button"
                        className="btn btn-secondary"
                        disabled={showBlocks}
                        onClick={() => setShowBlocks(true)}>
                  <Icon icon="Card" color="#2E3440" size={25}/>
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Mentor's name" />
            </div>
            {currentUser.role !== 2
              && (
              <div className="custom-control custom-switch col-2 offset-1">
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
            {!showBlocks &&
            <div className="col-2 d-flex">
              <label
                  className={classNames(styles['label-for-select'])}
                  htmlFor="change-visible-people"
              >
                Rows
              </label>
              <select
                  className={classNames('form-control', styles['change-rows'])}
                  id="change-visible-people"
                  onChange={(event) => {
                    changeCountVisibleItems(event.target.value);
                  }}
              >
                <option>9</option>
                <option>27</option>
                <option>45</option>
                <option>72</option>
                <option>99</option>
              </select>
            </div>
            }
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
            {showBlocks ?
                <div className="container d-flex flex-wrap">
                  <List listType={'block'} props={listProps}/>
                </div>
                :
                <Table sortingCategories={sortingCategories}
                       currentUser={currentUser}
                       onClick={handleSortByParam}
                       data={filteredMentorList}
                       access={{unruledUser: [2], unassigned: ''}}
                >
                  <List props={listProps} listType={'list'}/>
                </Table>
            }
          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
