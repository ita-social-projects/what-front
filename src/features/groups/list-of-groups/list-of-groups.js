import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths } from '@/shared';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import { useActions } from '@shared/hooks/index.js';
import { Button, Search, WithLoading, Card, Pagination } from '@components/index.js';
import { globalLoadStudentGroups, loadStudentGroupsSelector } from '@models/index.js';
import classNames from 'classnames';
import styles from './list-of-groups.scss';
import Icon from '@/icon.js';
import {icons} from "react-icons";
import {inputGroupStartDate} from "@features/groups/list-of-groups/redux/actions";

const editIcon = (
    <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className={classNames("bi bi-pencil", styles.scale)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
      <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
    </svg>
);

const icon1 = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
      <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
    </svg>
);

const icon2 = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
    </svg>
);


export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(12);

  const [ filteredGroupsList, setFilteredGroupsList ] = useState([]);

  const [ visibleGroups, setVisibleGroups ] = useState([]);

  const [searchGroupValue, setSearchGroupValue] = useState('');


  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;


  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '№' },
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
    setCurrentPage(currentPage)
  }, [currentPage]);

  useEffect(() => {
    if ( groups.length && !isLoading) {
      let newGroups = groups.map((group, index) => ({ index, ...group }));
      newGroups = newGroups.map(group => { return {quantity: group.studentIds.length, ...group}})
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
        .map(({name , studentIds, startDate , id, index}) => {
          return (
            <tr  className={styles['table-item']} onClick={() => handleCardDetails(id)} key={id}>
              <td>{index+1}</td>
              <td>{name}</td>
              <td>{studentIds.length}</td>
              <td>{startDate.replaceAll('-', '.').slice(0, 10).split('.').reverse().join('.')}</td>
              <td onClick={() => handleCardEdit(id)}>{editIcon}</td>
            </tr>
        )});


      if (!groupList.length && searchGroupName || searchStartDate) {
        return <h4>Group is not found</h4>;
      } if (!groupList.length && searchGroupName || searchStartDate) {
        return <h4>Group is not found</h4>;
      }
      if(!filteredGroupsList.length){
        return <tr><td className='text-info'>Group is not found</td></tr>;
      }

      return groupList;
    };

  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(listByDate.length / groupsPerPage);
    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
    setSortingCategories(sortingCategories.map((category) => {
      if(category.name === 'index'){
        return { ...category, sortedByAscending: true };
      }
      return { ...category, sortedByAscending: false };
    }));
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
    setSortingCategories(sortingCategories.map((category) => {
      if(category.name === 'index'){
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

    setVisibleGroups(sortedGroups)
  };



  return (
    <div className={classNames("container", styles['list-wrapper'])}>
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <div className="col-6">
          <h1>Groups</h1>
        </div>
        {filteredGroupsList.length > groupsPerPage ?
            <span className="col-2 text-right mb-3">{filteredGroupsList.length} groups</span> : null
        }
        <div className="col-4 d-flex align-items-center justify-content-end">

            {listByDate.length > groupsPerPage && !isLoading &&
            <Pagination
                itemsPerPage={groupsPerPage}
                totalItems={filteredGroupsList.length}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
                page={currentPage}
            />
            }

        </div>
      </div>
      <div className={classNames(styles['body-wrapper'], 'shadow p-3')}>
      <div className="row d-flex justify-content-between">

        <div className="col-2">
          <button className="btn">{icon1}</button>
          <button className="btn">{icon2}</button>
        </div>
        <div className="col-3  pl-3 d-flex justify-content-start">
          <Search onSearch={handleSearch} placeholder="Group's name" />
        </div>
        <div className="col-4 text-left ">
          <input
            className={classNames('form-control ', styles['calendar-input'], 'w-50')}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
        </div>

          <div className="col-3 d-flex justify-content-end">
            <Button onClick={handleAddGroup} className={styles['btn-add']}>
              <Icon icon="Plus" className="icon" />
                Add a group
            </Button>
          </div>
        </div>
        <div className='container mt-4'>

            <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
            <table className={classNames(styles['table'], 'table')}>
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
                        className={classNames(styles.category, {[styles['category-sorted']] : sortedByAscending})}
                    >
                      {tableHead}
                    </span>
                  </th>
                ))}
              <th scope="col" className="">Edit</th>
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