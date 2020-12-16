import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { editLesson, editLessonSelector, lessonsSelector } from '@/models';
import styles from './edit-lesson.scss';

export const EditLesson = (id) => {
  const history = useHistory();

  const [
    getMentors,
    getGroups,
    getStudents,
    createLesson,
  ] = useActions([fetchMentors, globalLoadStudentGroups, loadActiveStudents, addLesson]);

  const {
    data,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
  } = useSelector(lessonsSelector, shallowEqual);

  const {
    isLoading: editLoading,
    isLoaded: editIsLoaded,
    error: editError,
  } = useSelector(editLessonSelector, shallowEqual);

  const updateLesson = useActions(editLesson);

  const lessonOnEdit = data.find((lesson) => lesson.id === id);

  useEffect(() => {
    if (!mentorsIsLoaded && !mentorError) {
      getMentors();
    }
  }, [mentorsError, mentorsIsLoaded, getMentors]);

  useEffect(() => {
    if (!groupsIsLoaded && !groupsError) {
      getGroups();
    }
  }, [groupsError, groupsIsLoaded, getGroups]);

  useEffect(() => {
    if (!studentsIsLoaded && !studentsError) {
      getStudents();
    }
  }, [studentsError, studentsIsLoaded, getStudents]);

  useEffect(() => {
    if (!editError && editError) {
      history.push('/lessons');
    }
  }, [editError, editError]);

  const onSubmit = (values) => {
    updateLesson(values, id);
  };

  return (
    <div className={classNames(styles.page, 'container')}>
      <form id="form" className={styles.size}>
        <div className="row">
          <div className="col-lg-6">
            <h3>Lesson editing</h3>
            <hr />
            <div className="mt-5 form-group row">
              <label htmlFor="inputLessonTheme" className="col-sm-4 col-form-label">Lesson Theme:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="inputLessonTheme" placeholder="Lesson Theme" required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputGroupName" className="col-sm-4 col-form-label">Group Name:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="inputGroupName" placeholder="Group Name" required />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Choose date / time:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="date"
                  name="choose-date/time"
                  id="choose-date/time"
                  required
                  defaultValue="2020-09-05"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col" aria-label="first_col" />
                  <th scope="col">Full Student's Name</th>
                  <th scope="col" className="text-center">Mark</th>
                  <th scope="col" className="text-center">Presence</th>
                </tr>
              </thead>
              <tbody>
                { names.map((value, index) => (
                  <tr key={index}>
                    <th scope="row">{ index + 1 }</th>
                    <td><a href="#">{ value }</a></td>
                    <td><input className={styles.mode} type="number" max="12" min="2" /></td>
                    <td><input className={styles.mode} type="checkbox" required /></td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <div className={styles.placement}>
        <button form="form" type="button" className="btn btn-danger btn-lg">Delete</button>
        <div className={styles.placement}>
          <button form="form" type="button" className="btn btn-secondary btn-lg mr-5">Cancel</button>
          <button form="form" type="button" className="btn btn-success btn-lg">Save</button>
        </div>
      </div>
    </div>
  );
};