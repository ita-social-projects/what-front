import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { sendThemes, importThemesSelector } from '@/models';
import { Formik, Form, Field } from 'formik';


export const DownloadThemes = () => {
  const { isLoading, isLoaded, error } = useSelector(importThemesSelector, shallowEqual);
  const history = useHistory();
  const downloadThemes = useActions(sendThemes);
  
  useEffect(() => {
    if (!error && isLoaded) {
      history.push(paths.LESSONS);
    }
  }, [error, isLoaded]);
  
  const onSubmit = (values) => {
    downloadThemes(values);
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 card shadow">
          <Formik
            initialValues={
              {file: ""}
            }
            onSubmit={onSubmit}
          >
            {({ values, errors, dirty }) => (
              <Form className="px-2 py-4" name="start-group">
                <h3>Download Themes</h3>
                <hr />
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0 font-weight-bolder" htmlFor="file">Theme('s):</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      type="file"
                      name="file"
                      id="file"
                      accept=".xlsx"
                    />
                  </div>
                </div>
                <div className="row justify-content-around mt-4">
                  <Link
                    to="/lessons"
                    className='btn btn-secondary w-25'
                  >Back
                  </Link>
                  <input
                    type="submit"
                    name="submit-btn"
                    disabled={isLoading || !dirty ||errors.name}
                    className='btn btn-success w-25'
                    value="Send"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
