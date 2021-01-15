import React, {useEffect, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {paths, useActions} from '@/shared';
import {WithLoading} from '@/components/index.js';
import {
  importStudentsSelector,
  loadStudentGroups, sendStudents, loadStudentGroupsSelector,
} from '@/models/index.js';
import classNames from 'classnames';
import {shallowEqual, useSelector} from "react-redux";
import styles from './download-students.scss'


export const DownloadStudents = () => {
  const {
    data: groups,
    isLoading: areLoading,
    loaded: areLoaded,
    error: coursesError,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);
  const [loadCourses] = useActions([loadStudentGroups]);
  
  useEffect(() => {
    loadCourses()
  }, [loadCourses]);
  
  const [fileName, setFileName] = useState('');
  
  const {
    data: groupsDownloading,
    isLoading: isDownloadingLoading,
    isLoaded: isDownloadingLoaded,
    error: downloadingError,
  } = useSelector(importStudentsSelector, shallowEqual);
  
  const history = useHistory();
  
  useEffect(() => {
    if (!groups && areLoading || !groupsDownloading && isDownloadingLoading ) {
      history.push(paths.NOT_FOUND);
    }
  }, [groups, areLoading, groupsDownloading, isDownloadingLoading]);
  
  useEffect(() => {
    if (!downloadingError && isDownloadingLoaded) {
      history.push(paths.GROUPS);
    }
  }, [downloadingError, isDownloadingLoaded]);
  
  const onSubmit = (values) => {
    sendStudents(values);
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4">
          <div className="px-2 py-4">
            <h3>Group Starting</h3>
            <hr />
            
            <Formik
              initialValues={{
                groupId: '',
                students: ''
              }}
              onSubmit={onSubmit}
            >
              {({dirty, setFieldValue}) => (
                <Form>
                  <div className="row m-0 pt-3">
                    <div className="col-md-4 font-weight-bolder">
                      <label htmlFor="groupsInput">Course:</label>
                    </div>
                    <div className="col-md-8">
                      <WithLoading isLoading={areLoading}>
                        <Field
                          as="select"
                          className={classNames('custom-select')}
                          name="groupId"
                          id="groupsInput"
                        >
                          {
                            groups
                              .filter((el) => el.id !== groups.id)
                              .map((el) => (
                                <option value={el.id} key={el.id}>{el.name}</option>
                              ))
                          }
                        </Field>
                      </WithLoading>
                    </div>
                  </div>
                  <div className="row m-0 pt-3">
                    <div className="col-md-4 font-weight-bolder pt-3">
                      <label htmlFor="studentsInput">Student(s):</label>
                    </div>
                    <div className='col-md-8'>
                      <input type="file" id="actual-btn" name="themes" accept=".xlsx" onChange={(event) => {
                        setFileName(event.target.files[0].name);
                        setFieldValue("themes", event.currentTarget.files[0]);
                      }} className="form-control" hidden/>
                      <label className={classNames(styles.label, "mr-2 col-md-6")} htmlFor="actual-btn">Choose File</label>
                      <span className='font-weight-bolder'>{fileName}</span>
                    </div>
                  </div>
                  <div className="row justify-content-between mt-4 px-4">
                    <Link
                      to="/lessons"
                      className={classNames('btn btn-secondary w-25', styles.button)}
                    >Back
                    </Link>
                    <input
                      type="submit"
                      name="submit-btn"
                      className={classNames('w-25 btn btn-success', styles.button)}
                      disabled={!dirty || isDownloadingLoading|| coursesError || downloadingError}
                      value="Save"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}