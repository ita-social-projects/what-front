import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { paths, useActions } from '@/shared';
import { currentUserSelector } from '@/models';
import { Button, Pagination, Search, WithLoading } from '@/components';
import { List } from '@components/list';
import { Table } from '@components/table';
import { addAlert } from '@/features/layout';
import Icon from '@/icon.js';

import { useFetchMentors } from './useFetchMentors';
import styles from './list-of-mentors.scss';

export const ListOfMentors = () => {
  const INITIAL_CATEGORIES = [
    { id: 0, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 1, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 2, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];
  const history = useHistory();
  const { loading, error, activeMentors, disabledMentors } = useFetchMentors();
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const [dispatchAddAlert] = useActions([addAlert]);
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [visibleMentors, setVisibleMentors] = useState([]);
  const [sortingCategories, setSortingCategories] =
    useState(INITIAL_CATEGORIES);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [showBlocks, setShowBlocks] = useState(false);

  const searchMentors = (searchedMentors, value) =>
    searchedMentors.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`
        .toLowerCase()
        .includes(value.trim().toLowerCase())
    );

  const changeActiveCategory = (categories, activeCategoryName) =>
    categories.map((category) => {
      return {
        ...category,
        sortedByAscending:
          category.name === activeCategoryName
            ? !category.sortedByAscending
            : false,
      };
    });

  useEffect(() => {
    if (!loading) {
      const mentors = isShowDisabled ? disabledMentors : activeMentors;
      setFilteredMentorList(
        mentors.map((mentor, index) => ({ index, ...mentor }))
      );
      setSortingCategories(INITIAL_CATEGORIES);
    }
  }, [activeMentors, loading, disabledMentors, isShowDisabled]);

  useEffect(() => {
    if (error) {
      dispatchAddAlert('Mentors loading is failed');
    }
  }, [error, dispatchAddAlert]);

  useEffect(() => {
    const searchedMentors = searchMentors(
      isShowDisabled ? disabledMentors : activeMentors,
      searchMentorValue
    );
    setFilteredMentorList(
      searchedMentors.map((mentor, index) => ({ index, ...mentor }))
    );
  }, [searchMentorValue, isShowDisabled]);

  const handleSortByParam = (data, categoryParams) => {
    setSortingCategories(
      changeActiveCategory(sortingCategories, categoryParams.sortingParam)
    );
    setFilteredMentorList(data);
  };

  const handleShowDisabled = () => {
    setIsShowDisabled(!isShowDisabled);
  };

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = useCallback(() => {
    history.push(paths.UNASSIGNED_USERS);
  }, [history]);

  const handleDetails = useCallback(
    (id) => {
      history.push(`${paths.MENTORS_DETAILS}/${id}`);
    },
    [history]
  );

  const handleEdit = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push(`${paths.MENTOR_EDIT}/${id}`);
    },
    [history]
  );

  const listProps = {
    data: visibleMentors,
    handleDetails,
    handleEdit,
    errors: [
      {
        message: 'Mentor is not found',
        check: [!visibleMentors.length && !!searchMentorValue],
      },
    ],
    access: currentUser.role !== 2,
    fieldsToShow: ['firstName', 'lastName', 'email', 'edit'],
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Mentors</h2>
        {!loading && (
          <span className="col-2 text-right">
            {visibleMentors.length} of {filteredMentorList.length} mentors
          </span>
        )}
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={!showBlocks}
                  onClick={() => setShowBlocks(false)}
                >
                  <Icon icon="List" color="#2E3440" size={25} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={showBlocks}
                  onClick={() => setShowBlocks(true)}
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Mentor's name" />
            </div>
            {currentUser.role !== 2 && (
              <div className="custom-control custom-switch col-3 ">
                <input
                  onClick={handleShowDisabled}
                  type="checkbox"
                  className={classNames(
                    'custom-control-input',
                    styles['switch-input']
                  )}
                  id="disabledMentors"
                />
                <label
                  className={classNames(
                    'custom-control-label',
                    styles['switch-label']
                  )}
                  htmlFor="disabledMentors"
                >
                  Disabled Mentors
                </label>
              </div>
            )}
            <div className="col-4 text-right">
              {currentUser.role !== 2 && (
                <Button onClick={addMentor}>
                  <span>Add a mentor</span>
                </Button>
              )}
            </div>
          </div>
          <WithLoading isLoading={loading} className="d-block mx-auto m-0">
            {showBlocks ? (
              <div className="container d-flex flex-wrap">
                <List listType={'block'} props={listProps} />
              </div>
            ) : (
              <Table
                sortingCategories={sortingCategories}
                currentUser={currentUser}
                onClick={handleSortByParam}
                data={filteredMentorList}
                access={{ unruledUser: [2], unassigned: '' }}
              >
                <List props={listProps} listType={'list'} />
              </Table>
            )}
          </WithLoading>
        </div>
        <div
          className={classNames(
            'row justify-content-between align-items-center mb-3',
            styles.paginate
          )}
        >
          <Pagination
            items={filteredMentorList}
            setVisibleItems={setVisibleMentors}
          />
        </div>
      </div>
    </div>
  );
};
