import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import { newUserSelector, currentUserSelector, addMentor, createSecretary, addStudent } from '@/models/index.js';

import Icon from '../../icon.js';
import { Search, Button, WithLoading } from '../../components/index.js';

import { fetchUnAssignedUserList } from '../../models/index.js';

import styles from './unassigned-list.scss';

export const UnAssignedList = () => {
  const roles = ['student', 'mentor', 'secretary'];
  const { currentUser } = useSelector(currentUserSelector);
  const currentUserRole = currentUser.role;
  const { isLoaded, data } = useSelector(newUserSelector);

  const [getUnAssignedUserList] = useActions([fetchUnAssignedUserList]);

  const [addStudentRole,
    addSecreteryRole,
    addMentorRole] = useActions([addStudent, createSecretary, addMentor]);

  const [usersRoles, setUsersRole] = useState(data[0]?.map((user) => ({ id: user.id, role: 1 })));

  const [search, setSearch] = useState('');
  const [searchPersonValue, setSearchPersonValue] = useState([]);

  useEffect(() => {
    getUnAssignedUserList();
  }, [getUnAssignedUserList]);

  useEffect(() => {
    if (isLoaded) {
      setSearchPersonValue(data[0]);
    }
  }, [data[0]]);

  useEffect(() => {
    if (isLoaded) {
      const results = data[0]?.filter((user) => (
        (user.firstName.concat(user.lastName)).toUpperCase())
        .includes(search.toUpperCase()));
      setSearchPersonValue(results);
    }
  }, [search]);

  const changeRole = (id, value) => {
    const newState = searchPersonValue.map((user) => (user.id === id ? ({ ...user, role: Number(value) }) : user));
    setUsersRole(newState);
  };

  const handleButtonClick = (id) => {
    const { role } = usersRoles.find((user) => user.id === id);
    if (role !== 0) {
      switch (role) {
        case 1:
          return addStudentRole(id);
        case 2:
          return addMentorRole(id);
        case 3:
          return addSecreteryRole(id);
        default: return {};
      }
    }
  };

  const handleSearch = (inputValue) => {
    setSearch(inputValue);
  };

  const options = () => {
    switch (currentUserRole) {
      case 2:
        return <option value={1}>{roles[0]}</option>;
      case 3:
        return roles.slice(0, 2).map((role) => (
          <option value={roles.indexOf(role) + 1}>
            {role}
          </option>
        ));
      case 4:
        return roles.map((role) => (
          <option value={roles.indexOf(role) + 1}>
            {role}
          </option>
        ));
      default: return {};
    }
  };

  const list = () => {
    if (isLoaded) {
      if (searchPersonValue.length !== 0) {
        return (searchPersonValue.map((user) => (
          <div className={styles.card}>
            <p>{user.firstName} {user.lastName}<br />{user.email}</p>
            <div className={styles['add-role']}>
              <Button
                className={styles.btn}
                onClick={() => handleButtonClick(user.id)}
                variant="warning"
              >
                <Icon icon="Plus" size={20} className="icon" />
                Add role
              </Button>
              <select
                className={styles.select}
                onChange={(event) => { changeRole(user.id, event.target.value); }}
              >
                {options()}
              </select>
            </div>
          </div>
        ))
        );
      }
      return (<span className={styles.massage}>Nobody was found</span>);
    }
    return (<WithLoading isLoading={!isLoaded} className={styles.warning} />);
  };

  return (
    <div className={styles['conteiner-list']}>
      <div className={styles.panel}>
        <Search onSearch={handleSearch} placeholder="Enter a person`s name" />
      </div>
      <div className={styles.list}> {list()} </div>
    </div>
  );
};
