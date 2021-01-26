import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { globalLoadStudentGroups, loadStudentGroupsSelector } from '@models/index.js';
import { paths, useActions } from '@/shared/index.js';

import { Button, Search, WithLoading, Pagination } from '@components/index.js';

import Icon from '@/icon.js';
import { inputGroupStartDate } from '@features/groups/list-of-groups/redux/actions';

import classNames from 'classnames';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import styles from './list-of-groups.scss';

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(10);

  const [filteredGroupsList, setFilteredGroupsList] = useState([]);

  const [visibleGroups, setVisibleGroups] = useState([]);

  const [searchGroupValue, setSearchGroupValue] = useState('');

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'name', sortedByAscending: false, tableHead: 'Group Name' },
    { id: 2, name: 'quantity', sortedByAscending: false, tableHead: 'Quantity of students' },
    { id: 3, name: 'startDate', sortedByAscending: false, tableHead: 'Date of start' },
  ]);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  const handleAddGroup = useCallback(() => {
    history.push(paths.GROUP_ADD);
  }, [history]);

  const handleSearch = (inputValue) => {
    setSearchGroupValue(inputValue);
  };

  const handleCardEdit = useCallback((id) => {
    history.push(`${paths.GROUP_EDIT}/${id}`);
  }, [history]);

  const handleCardDetails = useCallback((id) => {
    history.push(`${paths.GROUPS_DETAILS}/${id}`);
  }, [history]);

  const handleCalendarChange = (event) => {
    const date = event.target.value;
    inputGroupStartDate(date);
  };

  const searchGroups = (searchedGroups) => searchedGroups.filter(({ name }) => `${name}`
    .toLowerCase().includes(searchGroupValue.toLowerCase()));

  const listByName = groups.filter((group) => {
    const normalizedName = group.name.toUpperCase();
    return normalizedName.includes(searchGroupName.toUpperCase());
  });

  const listByDate = listByName.filter((group) => group.startDate.includes(searchStartDate));

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (groups.length && !isLoading) {
      let newGroups = groups.map((group, index) => ({ index, ...group }));
      newGroups = newGroups.map((group) => ({ quantity: group.studentIds.length, ...group }));
      setFilteredGroupsList(newGroups);
    }

    setVisibleGroups(filteredGroupsList.slice(indexOfFirstGroup, indexOfLastGroup));
  }, [groups, isLoading]);

  useEffect(() => {
    setVisibleGroups(filteredGroupsList.slice(indexOfFirstGroup, indexOfLastGroup));
  }, [currentPage, filteredGroupsList]);

  useEffect(() => {
    const searchedGroups = searchGroups(groups);

    setFilteredGroupsList(searchedGroups.map((mentor, index) => ({ index, ...mentor })));
  }, [searchGroupValue]);

  const getGroupList = () => {
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

    const groupList = visibleGroups
      .map(({ name, studentIds, startDate, id, index }) => (
        <tr className={styles['table-item']} onClick={() => handleCardDetails(id)} key={id}>
          <td className="text-center">{index + 1}</td>
          <td>{name}</td>
          <td>{studentIds.length}</td>
          <td>{startDate.replaceAll('-', '.').slice(0, 10).split('.').reverse()
            .join('.')}
          </td>
          <td
            className="text-center"
            onClick={() => handleCardEdit(id)}
          >
            <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30} />
          </td>
        </tr>
      ));

    if (!groupList.length && searchGroupName || searchStartDate) {
      return <h4>Group is not found</h4>;
    }
    if (!filteredGroupsList.length) {
      return <tr><td className="text-info">Group is not found</td></tr>;
    }

    return groupList;
  };

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(listByDate.length / groupsPerPage);
    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === 'index') {
        return { ...category, sortedByAscending: true };
      }
      return { ...category, sortedByAscending: false };
    }));
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === 'index') {
        return { ...category, sortedByAscending: true };
      }
      return { ...category, sortedByAscending: false };
    }));
  };

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;

    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedGroups = [...visibleGroups].sort((prevGroup, currentGroup) => {
      if (prevGroup[sortingParam] > currentGroup[sortingParam]) {
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

    setVisibleGroups(sortedGroups);
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Groups</h2>
        {filteredGroupsList.length > groupsPerPage
          ? <span className="col-2 text-right">{filteredGroupsList.length} groups</span> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {listByDate.length > groupsPerPage && !isLoading
            && (
            <Pagination
              itemsPerPage={groupsPerPage}
              totalItems={filteredGroupsList.length}
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
              <Search onSearch={handleSearch} placeholder="Group's name" />
            </div>
            <div className="col-2 text-left">
              <input
                className={classNames('form-control ', styles['calendar-input'])}
                type="date"
                name="group_date"
                required
                onChange={handleCalendarChange}
                placeholder="year-month-day"
              />
            </div>
            <div className="col-2 offset-3 text-right">
              <Button onClick={handleAddGroup}>
                <span>Add a group</span>
              </Button>
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
            <table className={classNames(styles.table, 'table')}>
              <thead>
                <tr>
                  {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                    <th
                      className={styles['table-head']}
                      key={id}
                    >
                      <span
                        onClick={handleSortByParam}
                        data-sorting-param={name}
                        data-sorted-by-ascending={Number(sortedByAscending)}
                        className={classNames(styles.category, { [styles['category-sorted']]: sortedByAscending })}
                      >
                        {tableHead}
                      </span>
                    </th>
                  ))}
                  <th scope="col" className="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {getGroupList()}
              </tbody>
            </table>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};