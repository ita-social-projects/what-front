import React, {useEffect, useState} from 'react';
import { Formik, Field, Form } from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {paths, useActions} from '@/shared';
import {WithLoading} from '@/components/index.js';
import {
  importStudentsSelector, globalLoadStudentGroups,
 sendStudents, loadStudentGroupsSelector,
} from '@/models';
import { Button } from '@/components';
import classNames from 'classnames';
import {shallowEqual, useSelector} from "react-redux";
import styles from './download-students.scss'


export const DownloadStudents = () => {
  const history = useHistory();
  const downloadStudents = useActions(sendStudents);

  const {
    data: groups,
    isLoading: areLoading,
    isLoaded: areLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const [loadGroups] = useActions([globalLoadStudentGroups]);

   useEffect(() => {
    loadGroups();
  }, [loadGroups]);
  
  const [fileName, setFileName] = useState('');
  
  const {
    data: studentsDownloading,
    isLoading: isDownloadingLoading,
    isLoaded: isDownloadingLoaded,
    error: downloadingError,
  } = useSelector(importStudentsSelector, shallowEqual);
  
  useEffect(() => {
    if (!groups && areLoading || !studentsDownloading && isDownloadingLoading ) {
      history.push(paths.NOT_FOUND);
    }
  }, [groups, areLoading, studentsDownloading, isDownloadingLoading]);
  
  useEffect(() => {
    if (!downloadingError && isDownloadingLoaded) {
      history.push(paths.GROUPS);
    }
  }, [downloadingError, isDownloadingLoaded]);

  const onSubmit = (values) => {
    const defaultId = values.groupId;
    const formStudents = new FormData();
		formStudents.append('File', values.students);
    downloadStudents(defaultId === '' ? groups[0].id : defaultId, formStudents);
  };

  
  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4 ml-2 mr-2">
          <div className="px-2 py-4">
            <h3>Upload Student('s)</h3>
            <hr />
            
            <Formik
              initialValues={{
                groupId: '',
                students: ''
              }}
              onSubmit={onSubmit}
            >
              {({dirty, setFieldValue, errors, isEmpty}) => (
                <Form>
                  <div className="row m-0 pt-3">
                    <div className="col-md-4 font-weight-bolder">
                      <label htmlFor="groupsInput">Group:</label>
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
                      <label htmlFor="file">Student('s):</label>
                    </div>
                    <div className='col-md-8'>
                      <input type="file" id="actual-btn" name="students" accept=".xlsx" onChange={(event) => {
                        setFileName(event.target.files[0].name);
                        setFieldValue("students", event.currentTarget.files[0]);
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
                            disabled={!dirty || isEmpty || isDownloadingLoading || errors.groupId || errors.students}
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