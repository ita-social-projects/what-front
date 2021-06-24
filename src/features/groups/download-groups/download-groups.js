import React, {useEffect, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {paths, useActions} from '@/shared';
import {WithLoading} from '@/components/index.js';
import {
  importGroupsSelector, coursesSelector,
 sendGroups, fetchCourses,
} from '@/models';
import { Button } from '@/components';
import classNames from 'classnames';
import {shallowEqual, useSelector} from "react-redux";
import styles from './download-groups.scss'


export const DownloadGroups = () => {
  const history = useHistory();
  const downloadGroups = useActions(sendGroups);

  const {
    data: courses,
    isLoading: areLoading,
    isLoaded: areLoaded,
  } = useSelector(coursesSelector, shallowEqual);

  const [loadCourses] = useActions([fetchCourses]);

   useEffect(() => {
    loadCourses();
  }, [loadCourses]);
  
  const [fileName, setFileName] = useState('');
  
  const {
    data: groupsDownloading,
    isLoading: isDownloadingLoading,
    isLoaded: isDownloadingLoaded,
    error: downloadingError,
  } = useSelector(importGroupsSelector, shallowEqual);
  
  useEffect(() => {
    if (!courses && areLoading || !groupsDownloading && isDownloadingLoading ) {
      history.push(paths.NOT_FOUND);
    }
  }, [courses, areLoading, groupsDownloading, isDownloadingLoading]);
  
  useEffect(() => {
    if (!downloadingError && isDownloadingLoaded) {
      history.push(paths.GROUPS);
    }
  }, [downloadingError, isDownloadingLoaded]);

  const onSubmit = (values) => {
    const defaultVal = values.courseId;
    const formData = new FormData();
		formData.append('File', values.groups);
    downloadGroups(defaultVal === '' ? courses[0].id : defaultVal, formData);
  };
  
  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4 ml-2 mr-2">
          <div className="px-2 py-4">
            <h3>Upload Group('s)</h3>
            <hr />
            
            <Formik
              initialValues={{
                courseId: '',
                groups: ''
              }}
              onSubmit={onSubmit}
            >
              {({dirty, setFieldValue, errors, isEmpty}) => (
                <Form>
                  <div className="row m-0 pt-3">
                    <div className="col-md-4 font-weight-bolder">
                      <label htmlFor="coursesInput">Course:</label>
                    </div>
                    <div className="col-md-8">
                      <WithLoading isLoading={areLoading}>
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
                      <label htmlFor="file">Group('s):</label>
                    </div>
                    <div className='col-md-8'>
                      <input type="file" id="actual-btn" name="groups" accept=".xlsx" onChange={(event) => {
                        setFileName(event.target.files[0].name);
                        setFieldValue("groups", event.currentTarget.files[0]);
                      }} className="form-control" hidden/>
                      <label className={classNames(styles.label, "mr-2 col-md-6")} htmlFor="actual-btn">Choose File</label>
                      <span className='font-weight-bolder'>{fileName}</span>
                    </div>
                  </div>
                  <div className="row justify-content-end px-4">
                <Button
                            type="submit"
                            className="w-25"
                            variant="info"
                            disabled={!dirty || isEmpty || isDownloadingLoading || errors.groupId || errors.groups}
                          >
                            Send
                  </Button>
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