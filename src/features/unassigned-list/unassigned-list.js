import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import { newUserSelector, currentUserSelector, addMentor, createSecretary, addStudent } from '@/models/index.js';

import { fetchUnAssignedUserList } from '@/models';
import Icon from '../../icon.js';
import { Search, Button, WithLoading } from '../../components/index.js';

import styles from './unassigned-list.scss';

export const UnAssignedList = () => {
  const roles = ['Choose role', 'student', 'mentor', 'secretary'];
  const { currentUser } = useSelector(currentUserSelector);
  const currentUserRole = currentUser.role;
  const { isLoaded, data, isLoading } = useSelector(newUserSelector);

  const [getUnAssignedUserList] = useActions([fetchUnAssignedUserList]);

  const [addStudentRole,
    addSecretaryRole,
    addMentorRole] = useActions([addStudent, createSecretary, addMentor]);

  const [search, setSearch] = useState('');
  const [searchPersonValue, setSearchPersonValue] = useState([]);

  useEffect(() => {
    getUnAssignedUserList();
  }, [getUnAssignedUserList]);

  useEffect(() => {
    if (isLoading || isLoaded) {
      setSearchPersonValue(data?.map((user) => ({ id: user.id, role: 1 })));
    }
  }, [isLoaded, data, isLoading]);

  useEffect(() => {
    if (isLoaded || !isLoading) {
      const results = data?.filter((user) => (
        (user.firstName.concat(user.lastName)).toUpperCase())
        .includes(search.toUpperCase()));
      setSearchPersonValue(results);
    }
  }, [isLoaded, data, search, isLoading]);

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
          return addSecretaryRole(id);
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
    if (!isLoading || isLoaded) {
      if (searchPersonValue.length !== 0) {
        return (searchPersonValue.map((user) => (
          <div className={styles.card} key={Math.random()}>
            <p><span className={styles.name}>{user.firstName} {user.lastName}</span><br /><span className="font-italic">{user.email}</span></p>
            <div className={styles['add-role']}>
              <select
                className={styles.select}
                onChange={(event) => { changeRole(user.id, event.target.value); }}
              >
                {options()}
              </select>
              <Button
                className={styles.btn}
                onClick={() => handleButtonClick(user.id)}
                variant="warning"
              >
                <Icon icon="Plus" size={20} className="icon" />
                Add role
              </Button>
            </div>
          </div>
        ))
        );
      }
    }
    return (<WithLoading isLoading={!isLoaded} className={styles.warning}><span className={styles.massage}>Nobody was found</span></WithLoading>);
  };

  return (
    <div className={styles['container-list']}>
      <div className={styles.panel}>
        <Search onSearch={handleSearch} placeholder="Enter a person`s name" />
      </div>
      <div className={styles.list}> {list()} </div>
    </div>
  );
};
