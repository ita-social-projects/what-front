import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useActions } from '@shared/hooks/index.js';
import { Search, WithLoading } from '@components/index.js';
import { globalLoadStudentGroups, studentGroupsSelector } from '@models/index.js';
import { Card } from '@components/card/index.js';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import styles from './list-of-groups.scss';

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(studentGroupsSelector, shallowEqual);
  const { studentGroups, isLoading, isLoaded, error } = studentGroupsState;

  const { setSearchGroupValue, inputGroupStartDate } = useActions(listOfGroupsActions);
  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  useEffect(() => {
    if (!isLoaded && !error) {
      fetchListOfGroups();
    }
  }, [error, isLoaded, fetchListOfGroups]);

  const handleSearch = useCallback((inputValue) => {
    setSearchGroupValue(inputValue);
  }, [setSearchGroupValue]);

  const handleCardEdit = useCallback((id) => {
    history.push(`/edit/${id}`);
  }, [history]);

  const handleCardDetails = useCallback((id) => {
    history.push(`/${id}`);
  }, [history]);

  const handleCalendarChange = (event) => {
    const date = event.target.value;
    inputGroupStartDate(date);
  };

  const getGroupList = () => {
    if (isLoaded && error.length > 0) {
      return <h4>{error}</h4>;
    }

    if (isLoaded && !studentGroups.length) {
      return <h4>List of groups is empty</h4>;
    }

    const listByName = studentGroups.filter((group) => {
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
        onEdit={handleCardEdit}
        onDetails={handleCardDetails}
      />
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['list-head'], 'col-12')}>
          <input
            className={classNames('form-control ', styles['calendar-input'], 'col-4')}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
          <Search onSearch={handleSearch} placeholder="Search group" className={styles.search} />
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
