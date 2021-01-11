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

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(12);

  const { setSearchGroupValue, inputGroupStartDate } = useActions(listOfGroupsActions);
  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  const handleAddGroup = useCallback(() => {
    history.push(paths.GROUP_ADD);
  }, [history]);

  const handleSearch = useCallback((inputValue) => {
    setSearchGroupValue(inputValue);
  }, [setSearchGroupValue]);

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

  const listByName = groups.filter((group) => {
    const normalizedName = group.name.toUpperCase();
    return normalizedName.includes(searchGroupName.toUpperCase());
  });

  const listByDate = listByName.filter((group) => group.startDate.includes(searchStartDate));

  const getGroupList = () => {
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

    if (isLoaded && error.length > 0) {
      return <h4>{error}</h4>;
    }

    if (isLoaded && !groups.length) {
      return <h4>List of groups is empty</h4>;
    }

    return listByDate.slice(indexOfFirstGroup, indexOfLastGroup)
      .sort((a, b) => {
        return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
      })
      .map((group) => (
        <Card
          key={group.id}
          id={group.id}
          title={group.name}
          date={group.startDate.replaceAll('-', '.').slice(0, 10).split('.').reverse().join('.')}
          buttonName="Details"
          iconName="Edit"
          onEdit={() => handleCardEdit(group.id)}
          onDetails={() => handleCardDetails(group.id)}
        />
      ));
    };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classNames("container", styles['list-wrapper'])}>
      <div className="row">
        <div className="col-md-2 text-left">
          <input
            className={classNames('form-control ', styles['calendar-input'])}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
        </div>
        <div className="col-md-4 offset-md-2 text-center pl-3">
          <Search onSearch={handleSearch} placeholder="Group's name" />
        </div>
          <div className="col-md-4 col-12 text-right">
            <Button onClick={handleAddGroup} variant="warning">
              <Icon icon="Plus" className="icon" />
                Add a group
            </Button>
          </div>
        </div>
        <div>
          <hr className="col-8" />
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            <WithLoading isLoading={isLoading}>
              {getGroupList()}
            </WithLoading>
          </div>
        </div>
      {listByDate.length > 12 && !isLoading &&
        <Pagination 
          itemsPerPage={groupsPerPage} 
          totalItems={listByDate.length} 
          paginate={paginate}
        />
      }
    </div>
  );
};