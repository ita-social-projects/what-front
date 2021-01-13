import React, {useEffect, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {paths, useActions} from '@/shared';
import {Button, WithLoading} from '@/components/index.js';
import {
  importGroupsSelector,
  coursesSelector, sendGroups, fetchCourses,
} from '@/models/index.js';
import classNames from 'classnames';
import {shallowEqual, useSelector} from "react-redux";
import styles from './download-groups.scss'


export const DownloadGroups = () => {
  const {
    data: courses,
    isLoading: areCoursesLoading,
    loaded: areCoursesLoaded,
    error: coursesError,
  } = useSelector(coursesSelector, shallowEqual);
  const [loadCourses] = useActions([fetchCourses]);
  
  useEffect(() => {
    loadCourses()
  }, [loadCourses]);
  
  const [fileName, setFileName] = useState('');
  
  // const handleGroupsChange = (event) => {
  //   let file = event.target.files[0];
  //   setFileName(file.name);
  // };
  //
  const {
    data: groupsDownloading,
    isLoading: isDownloadingLoading,
    isLoaded: isDownloadingLoaded,
    error: downloadingError,
  } = useSelector(importGroupsSelector, shallowEqual);
  
  const history = useHistory();
  
  useEffect(() => {
    if (!courses && areCoursesLoading || !groupsDownloading && isDownloadingLoading ) {
      history.push(paths.NOT_FOUND);
    }
  }, [courses, areCoursesLoading, groupsDownloading, isDownloadingLoading]);
  
  useEffect(() => {
    if (!downloadingError && isDownloadingLoaded) {
      history.push(paths.GROUPS);
    }
  }, [downloadingError, isDownloadingLoaded]);
  

const onSubmit = (values) => {
  console.log(JSON.stringify(values));
  // sendGroups(JSON.stringify(values));
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
                courseId: '',
                groups: ''
              }}
              onSubmit={onSubmit}
            >
              {({dirty, setFieldValue}) => (
                <Form>
                  <div className="row m-0 pt-3">
                    <div className="col-md-4 font-weight-bolder">
                      <label htmlFor="coursesInput">Course:</label>
                    </div>
                      <div className="col-md-8">
                        <WithLoading isLoading={areCoursesLoading}>
                          <Field
                            as="select"
                            className={classNames('custom-select')}
                            name="courseId"
                            id="coursesInput"
                          >
                            {
                              courses
                                .filter((el) => el.id !== courses.id)
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
                      <label htmlFor="groupsInput">Group(`s):</label>
                    </div>
                    <div className='col-md-8'>
                      <input type="file" id="actual-btn" name="groups" accept=".xlsx, .csv" onChange={(event) => {
                        setFileName(event.target.files[0].name);
                        setFieldValue("groups", event.currentTarget.files[0]);
                      }} className="form-control" hidden/>
                      <label className={classNames(styles.label, "mr-2 col-md-4")} htmlFor="actual-btn">Choose File</label>
                      <span>{fileName}</span>
                    </div>
                  </div>
                  
                  
                  <div className="row m-0 pt-5 justify-content-end">
                    <div className="col-md-3 col-4">
                      <button
                        className={classNames('w-100 btn btn-success', styles.button)}
                        type="submit"
                        disabled={!dirty || isDownloadingLoading|| coursesError || downloadingError}
                      >Send
                      </button>
                    </div>
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