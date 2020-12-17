import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import { newUserSelector, currentUserSelector, addMentor, createSecretary, addStudent } from '@/models/index.js';
import className from 'classnames';

import Icon from '../../icon.js';
import { Search, Button, WithLoading } from '../../components/index.js';

import { fetchUnAssignedUserList } from '../../models/index.js';

import styles from './unassigned-list.scss';

export const UnAssignedList = () => {
  const roles = ['Choose role', 'student', 'mentor', 'secretary'];
  const { currentUser } = useSelector(currentUserSelector);
  const currentUserRole = currentUser.role;
  const { loaded, notAssigned } = useSelector(newUserSelector);

  const [getUnAssignedUserList] = useActions([fetchUnAssignedUserList]);

  const [addStudentRole,
    addSecreteryRole,
    addMentorRole] = useActions([addStudent, createSecretary, addMentor]);

  const [search, setSearch] = useState('');
  const [searchPersonValue, setSearchPersonValue] = useState([]);

  useEffect(() => {
    getUnAssignedUserList();
  }, [getUnAssignedUserList]);

  useEffect(() => {
    if (loaded) {
      setSearchPersonValue(notAssigned[0]?.map((user) => ({ id: user.id, role: 1 })));
    }
  }, [loaded, notAssigned]);

  useEffect(() => {
    if (loaded) {
      const results = notAssigned[0]?.filter((user) => (
        (user.firstName.concat(user.lastName)).toUpperCase())
        .includes(search.toUpperCase()));
      setSearchPersonValue(results);
    }
  }, [loaded, notAssigned, search]);

  const changeRole = (id, value) => {
    const newState = searchPersonValue.map((user) => (user.id === id ? ({ ...user, role: Number(value) }) : user));
    setSearchPersonValue(newState);
  };

  const handleButtonClick = (id) => {
    const { role } = searchPersonValue.find((user) => user.id === id);
    if (role !== 0) {
      const newState = searchPersonValue.filter((user) => user.id !== id);
      setSearchPersonValue(newState);
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
        return <option value={1}>{roles[1]}</option>;
      case 3:
        return roles.slice(0, 2).map((role) => (
          <option value={roles.indexOf(role)}>
            {role}
          </option>
        ));
      case 4:
        return roles.map((role) => (
          <option value={roles.indexOf(role)}>
            {role}
          </option>
        ));
      default: return {};
    }
  };

  const list = () => {
    if (loaded) {
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
    return (<WithLoading isLoading={!loaded} className={styles.warning} />);
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
