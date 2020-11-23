import React, { useState } from 'react';
import className from 'classnames';
import styles from './edit-students-details.scss';
import Icon from '../../icon.js';
import { Button } from '../../components/index.js';

export const EditStudentsDetails = () => {
  const student = {
    firstName: 'Taras',
    secondName: 'Tarasov',
    email: 'tarastarasov.@gmail.com',
    groups: [
      { id: 1, name: 'Group 1' },
      { id: 2, name: 'Group 2' },
      { id: 3, name: 'Group 3' },
      { id: 4, name: 'Group 4' },
      { id: 5, name: 'Group 5' },
      { id: 6, name: 'Group 6' },
    ],
  };

  const groupList = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
    { id: 4, name: 'Group 4' },
    { id: 5, name: 'Group 5' },
    { id: 6, name: 'Group 6' },
    { id: 7, name: 'Group 7' },
    { id: 8, name: 'Group 8' },
    { id: 9, name: 'Group 9' },
  ];

  const [groups, setGroups] = useState(student.groups || 0);
  const [groupInput, setInputValue] = useState('Type name of group');
  const [error, setError] = useState(null);

  /*  const editStudent = (student, changedData) => {
    const studentsList = dataList;
    const studentOnChange = student;
    for (const key in changedData) {
      const prop = key;
      if (changedData[key]) {
        switch (prop) {
          case 'firstName':
            studentOnChange[prop] = changedData[prop];
            break;
          case 'lastName':
            studentOnChange[prop] = changedData[prop];
            break;
          case 'email':
            studentOnChange[prop] = changedData[prop];
            break;
          default:
            return null;
        }
      }
      const index = studentsList.indexOf(student);
      studentsList[index] = studentOnChange;
      return studentsList;
    }
  }; */

  const handleGroupDelete = (evt) => {
    setError('');
    const element = evt.target.closest('li');
    const groupsList = groups.filter((group) => group.name !== element.dataset.groupname);
    setGroups(groupsList);
  };

  const handleGroupAdd = () => {
    const checkName = groups.find((group) => group.name === groupInput);
    if (checkName) {
      setError('This group was already added to the list');
    } else {
      const groupObject = groupList.find((group) => group.name === groupInput);
      if (groupObject) {
        const res = [
          ...groups,
          groupObject,
        ];
        setGroups(res);
      } else {
        setError('Incorrect Group Name');
      }
    }
  };

  const handleInputChange = (evt) => {
    setError('');
    const { value } = evt.target;
    setInputValue(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container shadow pb-3">
        <div className="row m-0 pt-3">
          <div className="col-md-12">
            { error ? <div className="alert alert-danger">{error}</div> : null}
          </div>
          <div className="col-md-4">
            <label htmlFor="first-name">First Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="first-name" placeholder={student.firstName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="second-name">Second Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="second-name" placeholder={student.secondName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="email" placeholder={student.email} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="groups">Group('s):</label>
          </div>
          <div className="col-md-8">
            <div className="input-group flex-nowrap">
              <input
                className="form-control"
                list="group-list"
                placeholder={groupInput}
                onChange={handleInputChange}
              />
              <datalist id="group-list">
                {groupList.map(({ id, name }) => (
                  <option key={id}>{name}</option>
                ))}
              </datalist>
              <div className="input-group-append">
                <Button variant="warning" onClick={handleGroupAdd}><Icon icon="Plus" /></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-8 offset-md-4">
            <ul className="d-flex flex-wrap justify-content-between p-0">
              {groups.map(({ id, name }) => (
                <li
                  className={className(styles['list-element'],
                    'd-flex bg-light border border-outline-secondary rounded')}
                  key={id}
                  data-groupId={id}
                  data-groupName={name}
                >
                  {name}
                  <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger" onClick={handleGroupDelete}>X</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-3 col-4">
            <Button className="w-100" variant="danger">Exclude</Button>
          </div>
          <div className="col-md-3 offset-md-3 col-4">
            <Button className="w-100">Clear</Button>
          </div>
          <div className="col-md-3 col-4">
            <Button className="w-100" variant="success">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};