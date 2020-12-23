import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { useActions } from '@shared/hooks/index.js';
import { Button, Search, WithLoading } from '@components/index.js';
import { globalLoadStudentGroups, loadStudentGroupsSelector } from '@models/index.js';
import { Card } from '@components/card/index.js';
import Icon from '@/icon.js';
import { paths } from '@/shared';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import styles from './list-of-groups.scss';

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

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

  const getGroupList = () => {
    if (isLoaded && error.length > 0) {
      return <h4>{error}</h4>;
    }

    if (isLoaded && !groups.length) {
      return <h4>List of groups is empty</h4>;
    }

    const listByName = groups.filter((group) => {
      const normalizedName = group.name.toUpperCase();
      return normalizedName.includes(searchGroupName.toUpperCase());
    });

    const listByDate = listByName.filter((group) => group.startDate.includes(searchStartDate));
    return listByDate.map((group) => (
      <Card
        key={group.id}
        id={group.id}
        title={group.name}
        date={group.startDate.replaceAll('-', '.').slice(0, 10)}
        buttonName="Details"
        iconName="Edit"
        onEdit={() => handleCardEdit(group.id)}
        onDetails={() => handleCardDetails(group.id)}
      />
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['list-head'], 'col-12')}>
          <input
            className={classNames('form-control ', styles['calendar-input'], 'col-2')}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
          <Search onSearch={handleSearch} placeholder="Search group" className={styles.search} />
          <Button onClick={handleAddGroup} variant="warning">
            <Icon icon="Plus" className="icon" />
            Add Group
          </Button>
        </div>
        <hr className="col-8" />
        <div className={classNames(styles['group-list'], 'col-12')}>
          <WithLoading isLoading={isLoading}>
            {getGroupList()}
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
