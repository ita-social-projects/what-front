import React from 'react';
import styles from './edit-students-details.scss';
import Icon from '../../icon';
import { Button } from '../../components/Button';

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
      { id: 6, name: 'Group 6' }
    ]
  }

  return (
    <div className={styles.wrapper}>
      <div className="container shadow pb-3">
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="first-name">First Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className={`${styles['input-style']} form-control`} id='first-name' placeholder={student.firstName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="second-name">Second Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className={`${styles['input-style']} form-control`} id='second-name' placeholder={student.secondName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className={`${styles['input-style']} form-control`} id='email' placeholder={student.email} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="groups">Group('s):</label>
          </div>
          <div className="col-md-8">
            <div className="input-group flex-nowrap">
              <input className={`${styles['input-style']} form-control`} list="group-list" placeholder="Type name of group" />
              <datalist id="group-list">
                {student.groups.map(({ id, name }) => <option key={id}>{name}</option>)}
              </datalist>
              <div className="input-group-append">                
                <Button variant="warning"><Icon icon="Plus" /></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-8 offset-md-4">
            <ul className="d-flex flex-wrap justify-content-between p-0">
              {student.groups.map(({ id, name }) => <li className={`${styles['list-element']} d-flex bg-light border border-outline-secondary rounded`} key={id}>{name}
                <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger">X</button>
              </li>)}
            </ul>
          </div>
        </div>
        <div className='row m-0 pt-3'>
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
  )
}