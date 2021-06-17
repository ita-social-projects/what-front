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
import {commonHelpers} from "@/utils";

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage, setGroupsPerPage] = useState(9);

  const [filteredGroupsList, setFilteredGroupsList] = useState([]);

  const [visibleGroups, setVisibleGroups] = useState([]);

  const [searchGroupValue, setSearchGroupValue] = useState('');

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'name', sortedByAscending: false, tableHead: 'Group Name' },
    { id: 2, name: 'quantity', sortedByAscending: false, tableHead: 'Quantity of students' },
    { id: 3, name: 'startDate', sortedByAscending: false, tableHead: 'Date of start' },
    { id: 4, name: 'finishDate', sortedByAscending: false, tableHead: 'Date of finish' },
  ];

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  const handleAddGroup = useCallback(() => {
    history.push(paths.GROUP_ADD);
  }, [history]);

  const handleSearch = (inputValue) => {
    setSearchGroupValue(inputValue);
  };

  const handleCardEdit = useCallback((id, event) => {
    event.stopPropagation();
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

    setSortingCategories(INITIAL_CATEGORIES);
    setVisibleGroups(filteredGroupsList.slice(indexOfFirstGroup, indexOfLastGroup));
  }, [groups, isLoading]);

  useEffect(() => {
    setVisibleGroups(filteredGroupsList.slice(indexOfFirstGroup, indexOfLastGroup));
  }, [currentPage, filteredGroupsList]);

  useEffect(() => {
    const searchedGroups = searchGroups(groups);

    setFilteredGroupsList(searchedGroups.map((mentor, index) => ({ index, ...mentor })));
  }, [searchGroupValue]);
  commonHelpers.transformDateTime({isDayTime:false });

  const getGroupList = () => {
    const groupList = visibleGroups
      .map(({ name, studentIds, startDate, id, index, finishDate}) => (
        <tr className={styles['table-item']} onClick={() => handleCardDetails(id)} key={id}>
          <td className="text-center">{index + 1}</td>
          <td>{name}</td>
          <td>{studentIds.length}</td>
          <td>{commonHelpers.transformDateTime({ isDayTime:false, dateTime: startDate }).date}
          </td>
          <td>{commonHelpers.transformDateTime({ isDayTime:false, dateTime:finishDate }).date}
          </td>
          <td
            className="text-center"
            onClick={(event) => handleCardEdit(id, event)}
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
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  };

  const handleSortByParam = useCallback((event) => {
    const categoryParams = event.target.dataset;
    const sortedGroups = getSortedByParam(filteredGroupsList, categoryParams);

    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setFilteredGroupsList(sortedGroups);
    setVisibleGroups(filteredGroupsList.slice(indexOfFirstGroup, indexOfLastGroup));
  }, [sortingCategories, filteredGroupsList]);

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleGroups(filteredGroupsList.slice(start, finish));
    setGroupsPerPage(newNumber);
  };

  const downloadGroups = () => {
    history.push(paths.GROUPS_DOWNLOAD);
  };

  const paginationComponent = () => {
    if (filteredGroupsList.length < groupsPerPage) {
      return (
        <Pagination
          itemsPerPage={groupsPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={groupsPerPage}
        totalItems={filteredGroupsList.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Groups</h2>
        <div className="col-2 text-right">
          {
            !isLoading
            && `${visibleGroups.length} of ${filteredGroupsList.length} students`
          }
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3 d-flex justify-content-between">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled><Icon icon="List" color="#2E3440" size={25} /></button>
                <button type="button" className="btn btn-outline-secondary" disabled><Icon icon="Card" color="#2E3440" size={25} /></button>
              </div>
            </div>
            <div className="col-3 ">
              <Search onSearch={handleSearch} placeholder="Group's name" />
            </div>
            <div className="col-2">
              <input
                className={classNames('form-control ', styles['calendar-input'])}
                type="date"
                name="group_date"
                required
                onChange={handleCalendarChange}
                placeholder="Start Date"
              />
            </div>
            <div className="col-1 d-flex">
              <label
                className={classNames(styles['label-for-select'])}
                htmlFor="change-visible-people"
              >
                Rows
              </label>
              <select
                className={classNames('form-control', styles['change-rows'])}
                id="change-visible-people"
                onChange={(event) => { changeCountVisibleItems(event.target.value); }}
              >
                <option>9</option>
                <option>27</option>
                <option>45</option>
                <option>72</option>
                <option>99</option>
              </select>
            </div>
            <div className="col-4 text-right">
              <Button
                onClick={downloadGroups}
                type="button"
                className={classNames('btn btn-warning ', styles['left-add-btn'])}>
                Upload Group('s)
              </Button>
              <Button onClick={handleAddGroup}>
                <span>Add a group</span>
              </Button>
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto">
            <table className="table table-hover mb-0">
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
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
