import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@/shared/index.js';
import {
  newUserSelector, currentUserSelector, addMentor,
  createSecretary, addStudent, fetchUnAssignedUserList,
} from '@/models/index.js';
import { Search, Button, Pagination, WithLoading } from '@/components';
import { addAlert } from '@/features';
import Icon from '@/icon.js';
import classNames from 'classnames';
import styles from './unassigned-list.scss';
import { Table } from '@components/table';

export const UnAssignedList = () => {
  const { currentUser } = useSelector(currentUserSelector);
  const currentUserRole = currentUser.role;
  const { isLoaded, data, isLoading, error } = useSelector(newUserSelector);

  const [getUnAssignedUserList] = useActions([fetchUnAssignedUserList]);

  const [
    addStudentRole,
    addSecretaryRole,
    addMentorRole,
    dispatchAddAlert,
  ] = useActions([addStudent, createSecretary, addMentor, addAlert]);

  const [search, setSearch] = useState('');

  const [users, setUsers] = useState([]);

  const roles = [
    { id: 0, name: 'Choose role' },
    { id: 1, name: 'student' },
    { id: 2, name: 'mentor' },
    { id: 3, name: 'secretary' },
  ];

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 1, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 2, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [usersVisible, setUsersVisible] = useState([]);
  const [usersPerPage, setUserPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);

  useEffect(() => {
    getUnAssignedUserList();
  }, [getUnAssignedUserList]);

  useEffect(() => {
    if (isLoading || isLoaded) {
      setUsers(data?.map((user, index) => ({ id: user.id, index, role: 1, ...user })));
    }
  }, [isLoaded, data, isLoading]);

  useEffect(() => {
    if (isLoaded || !isLoading) {
      const results = data?.filter((user) => (
        (user.firstName.concat(user.lastName)).toUpperCase())
        .includes(search.toUpperCase()));
      setUsers(results?.map((user, index) => ({ id: user.id, index, role: 1, ...user })));
    }
  }, [isLoaded, data, search, isLoading]);

  useEffect(() => {
    setUsersVisible(users.slice(indexOfFirstUser, indexOfLastUser));
  }, [indexOfFirstUser, indexOfLastUser, users]);

  const changeActiveCategory = (categories, activeCategoryName) => categories.map((category) => {
    if (category.name === activeCategoryName) {
      return { ...category, sortedByAscending: !category.sortedByAscending };
    }
    return { ...category, sortedByAscending: false };
  });

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(users?.length / usersPerPage);

    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  };

  const changeRole = (id, value) => {
    const newState = users.map((user) => (user.id === id ? ({ ...user, role: Number(value) }) : user));
    setUsers(newState);
  };

  const handleButtonClick = (id) => {
    const { role } = users.find((user) => user.id === id);
    if (role !== 0) {
      const newState = users.filter((user) => user.id !== id);
      setUsers(newState?.map((user, index) => ({ id: user.id, index, ...user })));
      switch (role) {
        case 1:
          addStudentRole(id);
          dispatchAddAlert('The user has been successfully assigned as a student', 'success');
          break;
        case 2:
          addMentorRole(id);
          dispatchAddAlert('The user has been successfully assigned as a mentor', 'success');
          break;
        case 3:
          addSecretaryRole(id);
          dispatchAddAlert('The user has been successfully assigned as a secretary', 'success');
          break;
        default: break;
      }
    }
  };

  const handleSearch = (inputValue) => {
    setSearch(inputValue);
  };

  const handleSortByParam = (data, categoryParams) => {
    const sortedUsers = data;
    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setUsers(sortedUsers);
    setUsersVisible(users.slice(indexOfFirstUser, indexOfLastUser));
  };

  const options = () => {
    switch (currentUserRole) {
      case 2:
        return <option value={1}>{roles[1]}</option>;
      case 3:
        return roles.slice(0, 3).map((role) => (
          <option key={role.id} value={roles.indexOf(role)}>
            {role.name}
          </option>
        ));
      case 4:
        return roles.map((role) => (
          <option key={role.id} value={roles.indexOf(role)}>
            {role.name}
          </option>
        ));
      default: return {};
    }
  };
  const getPersonsRows = () => {
    const personsRows = usersVisible.map(({ id, firstName, lastName, email }) => (
      <tr
        key={id}
        data-person-id={id}
        className={styles['table-row']}
      >
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td
          className="d-flex justify-content-center"
        >
          <div className={styles['add-role']}>
            <select
              className={styles.select}
              onChange={(event) => { changeRole(id, event.target.value); }}
            >
              {options()}
            </select>
            <Button
              className={styles.btn}
              onClick={() => handleButtonClick(id)}
            >
              Add role
            </Button>
          </div>
        </td>
      </tr>
    ));

    if (error) {
      return <tr><td colSpan="5" className="text-center">Loading has been failed</td></tr>;
    }

    if (!users.length || search) {
      return <tr><td colSpan="5" className="text-center">No one has been found</td></tr>;
    }
    return personsRows;
  };

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setUsersVisible(users.slice(start, finish));
    setUserPerPage(newNumber);
  };

  const paginationComponent = () => {
    if (users.length < usersPerPage) {
      return (
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={users.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Unassigned Users</h2>
        <div className="col-3 text-right">{
           !isLoading
          && `${usersVisible.length} of ${users.length} unassigned users `
        }
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row mr-0">
        <div className="card col-12 shadow p-3 mb-5 bg-white rounded ml-2 mr-2">
          <div className="row align-items-center px-3 py-2 mb-2">
            <div className="col-4">
              <Search
                value={search}
                onSearch={handleSearch}
                placeholder="person's name"
              />
            </div>
            <div className="col-2 d-flex">
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
                <option>10</option>
                <option>30</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <WithLoading isLoading={!isLoaded} className="d-block mx-auto my-2">
            <Table sortingCategories={sortingCategories}
                   currentUser={currentUser}
                   onClick={handleSortByParam}
                   data={users}
                   access={{unruledUser: [4], unassigned: 'unassigned'}}
            >
              {getPersonsRows()}
            </Table>
          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
