import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@shared/index.js';
import {
  mentorIdSelector,
  mentorEditingSelector,
  mentorDeletingSelector,
  mentorGroupsSelector,
  mentorCoursesSelector,
  editMentor,
  deleteMentor,
  loadStudentGroupsSelector,
  coursesSelector,
  fetchCourses,
  globalLoadStudentGroups,
  fetchMentorById,
} from '@/models/index.js';

import { WithLoading, Button } from '@components/index.js';
import { editMentorValidation } from '@features/validation/validation-helpers.js';
import { addAlert, ModalWindow } from '@/features';
import { Formik, Field, Form } from 'formik';

import classNames from 'classnames';
import styles from './edit-mentor.scss';

export const EditMentor = ({ id }) => {
  const history = useHistory();
  const {
    data: mentor,
    isLoading: mentorIsLoading,
    isLoaded: mentorIsLoaded,
    error: mentorError,
  } = useSelector(mentorIdSelector, shallowEqual);

  const [
    dispatchMentorById,
    updateMentor,
    removeMentor,
    dispatchAddAlert,
    loadCourses,
    fetchListOfGroups,
  ] = useActions([
    fetchMentorById,
    editMentor,
    deleteMentor,
    addAlert,
    fetchCourses,
    globalLoadStudentGroups,
  ]);

  useEffect(() => {
    dispatchMentorById(id);
  }, [dispatchMentorById, id]);

  const {
    data: mentorGroups,
    isLoading: mentorGroupsAreLoading,
    isLoaded: mentorGroupsAreLoaded,
    error: mentorGroupsError,
  } = useSelector(mentorGroupsSelector, shallowEqual);

  const {
    data: mentorCourses,
    isLoading: mentorCoursesAreLoading,
    isLoaded: mentorCoursesAreLoaded,
    error: mentorCoursesError,
  } = useSelector(mentorCoursesSelector, shallowEqual);

  const {
    data: allGroups,
    isLoading: allGroupsAreLoading,
    isLoaded: allGroupsAreLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: allCourses,
    isLoading: allCoursesAreLoading,
    loaded: allCoursesAreLoaded,
  } = useSelector(coursesSelector, shallowEqual);

  const {
    isLoading: editedIsLoading,
    isLoaded: editedIsLoaded,
    error: editedIsError,
  } = useSelector(mentorEditingSelector, shallowEqual);

  const {
    isLoading: deletedIsLoading,
    isLoaded: deletedIsLoaded,
    error: deletedIsError,
  } = useSelector(mentorDeletingSelector, shallowEqual);

  const [groups, setGroups] = useState(mentorGroups || 0);
  const [courses, setCourses] = useState(mentorCourses || 0);
  const [groupInput, setGroupInputValue] = useState('Type name of a group');
  const [courseInput, setCourseInputValue] = useState('Type name of a course');
  const [errorGroup, setErrorGroup] = useState(null);
  const [errorCourse, setErrorCourse] = useState(null);
  const [toShowModal, setShowModal] = useState(false);
  const [formIsChanged, setFormIsChanged] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    setGroups(mentorGroups);
    setCourses(mentorCourses);
  }, [mentorGroups, mentorCourses]);

  useEffect(() => {
    if (mentorError && mentorGroupsError && mentorCoursesError) {
      history.push(paths.NOT_FOUND);
    }
  }, [mentorError, mentorGroupsError, mentorCoursesError, history]);

  useEffect(() => {
    if (!editedIsError && editedIsLoaded) {
      history.push(paths.MENTORS);
      dispatchAddAlert('Mentor has been successfully edited', 'success');
    }
    if (editedIsError && !editedIsLoaded) {
      dispatchAddAlert(editedIsError);
    }
  }, [dispatchAddAlert, editedIsError, editedIsLoaded, history]);

  useEffect(() => {
    if (!deletedIsError && deletedIsLoaded) {
      history.push(paths.MENTORS);
      dispatchAddAlert('Mentor has been fired', 'success');
    }
    if (deletedIsError && !deletedIsLoaded) {
      dispatchAddAlert(deletedIsError);
    }
  }, [deletedIsError, deletedIsLoaded, dispatchAddAlert, history]);

  const handleGroupInputChange = (e) => {
    setErrorGroup('');
    const { value } = e.target;
    setGroupInputValue(value);
  };

  const handleCourseInputChange = (e) => {
    setErrorCourse('');
    const { value } = e.target;
    setCourseInputValue(value);
  };

  const handleGroupAdd = () => {
    const checkName = groups.find((el) => el.name === groupInput);
    if (checkName) {
      setErrorGroup('This group was already added to the list');
    } else {
      const groupObject = allGroups.find((el) => el.name === groupInput);
      if (groupObject) {
        const res = [...groups, groupObject];
        checkEquality(mentorGroups, res);
        setGroups(res);
      } else {
        setErrorGroup('Invalid group name');
      }
    }
  };

  const handleCourseAdd = () => {
    const checkName = courses.find((el) => el.name === courseInput);
    if (checkName) {
      setErrorCourse('This course was already added to the list');
    } else {
      const courseObject = allCourses.find((el) => el.name === courseInput);
      if (courseObject) {
        const res = [...courses, courseObject];
        checkEquality(mentorCourses, res);
        setCourses(res);
      } else {
        setErrorCourse('Invalid course name');
      }
    }
  };

  const handleGroupDelete = (e) => {
    setErrorGroup('');
    const element = e.target.closest('li');
    const groupsList = groups.filter(
      (el) => el.name !== element.dataset.groupname
    );
    checkEquality(mentorGroups, groupsList);
    setGroups(groupsList);
  };

  const handleCourseDelete = (e) => {
    setErrorCourse('');
    const element = e.target.closest('li');
    const coursesList = courses.filter(
      (el) => el.name !== element.dataset.coursename
    );
    checkEquality(mentorCourses, coursesList);
    setCourses(coursesList);
  };

  const validateEditMentor = (values) => {
    const { firstName, lastName, email } = values;
    const name = firstName[0].toUpperCase() + firstName.slice(1);
    const secondName = lastName[0].toUpperCase() + lastName.slice(1);
    const studentGroupIds = groups.map((el) => el.id);
    const courseIds = courses.map((el) => el.id);
    const editedMentor = {
      firstName: name,
      lastName: secondName,
      email,
      studentGroupIds,
      courseIds,
    };
    updateMentor(id, editedMentor);
  };

  const onSubmit = (values) => {
    validateEditMentor(values);
  };

  const onFire = () => {
    handleCloseModal();
    removeMentor(id);
  };

  const resetInput = () => {
    setGroups(mentorGroups);
    setCourses(mentorCourses);
  };

  const checkEquality = (prev, current) => {
    const prevSet = new Set(prev.map((el) => el.id));
    const currSet = new Set(current.map((el) => el.id));
    const areSetsEqual = () => {
      return (
        prevSet.size === currSet.size &&
        [...prevSet].every((value) => currSet.has(value))
      );
    };
    setFormIsChanged(!areSetsEqual());
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h3>Mentor Editing</h3>
            <hr />
            <WithLoading
              isLoading={
                mentorIsLoading ||
                !mentorIsLoaded ||
                allCoursesAreLoading ||
                !allCoursesAreLoaded ||
                mentorCoursesAreLoading ||
                !mentorCoursesAreLoaded ||
                allGroupsAreLoading ||
                !allGroupsAreLoaded ||
                !mentorGroupsAreLoaded ||
                mentorGroupsAreLoading
              }
              className={styles['loader-centered']}
            >
              <Formik
                initialValues={{
                  firstName: mentor?.firstName,
                  lastName: mentor?.lastName,
                  email: mentor?.email,
                  groups: '',
                  courses: '',
                }}
                validationSchema={editMentorValidation}
                onSubmit={onSubmit}
              >
                {({ values, errors, isValid, dirty }) => (
                  <Form>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="firstName">First Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames('form-control', {
                            'border-danger': errors.firstName,
                          })}
                          name="firstName"
                          id="firstName"
                          value={values.firstName}
                        />
                        {errors.firstName ? (
                          <div className={styles.error}>{errors.firstName}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="lastName">Last Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames('form-control', {
                            'border-danger': errors.lastName,
                          })}
                          name="lastName"
                          id="lastName"
                          value={values.lastName}
                        />
                        {errors.lastName ? (
                          <div className={styles.error}>{errors.lastName}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="email">Email:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="email"
                          className={classNames('form-control', {
                            'border-danger': errors.email,
                          })}
                          name="email"
                          id="email"
                          value={values.email}
                        />
                        {errors.email ? (
                          <div className={styles.error}>{errors.email}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="groupsInput">Group(`s):</label>
                      </div>
                      <div className="d-flex flex-column col-md-8">
                        <div className="d-flex flex-row flex-nowrap input-group">
                          <Field
                            name="groupsInput"
                            id="groupsInput"
                            className={classNames(
                              'form-control col-md-11',
                              styles['group-input'],
                              { 'border-danger': errorGroup }
                            )}
                            list="group-list"
                            placeholder={groupInput}
                            onChange={handleGroupInputChange}
                          />
                          <datalist id="group-list">
                            {allGroups.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                          <div className="input-group-append">
                            <Button variant="info" onClick={handleGroupAdd}>
                              +
                            </Button>
                          </div>
                        </div>
                        {errorGroup ? (
                          <div className={styles.error}>{errorGroup}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-8 offset-md-4">
                        <ul className="d-flex flex-wrap justify-content-between p-0">
                          {groups.map(({ id, name }) => (
                            <li
                              className={classNames(
                                styles['list-element'],
                                'd-flex bg-light border border-outline-secondary rounded'
                              )}
                              key={id}
                              data-groupid={id}
                              data-groupname={name}
                            >
                              {name}
                              <button
                                className="btn p-0 ml-auto mr-2 text-dark"
                                type="button"
                                onClick={handleGroupDelete}
                              >
                                &#10005;
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="coursesInput">Course(`s):</label>
                      </div>
                      <div className="d-flex flex-column col-md-8">
                        <div className="d-flex flex-row flex-nowrap input-group">
                          <Field
                            name="coursesInput"
                            id="coursesInput"
                            className={classNames(
                              'form-control col-md-11',
                              styles.input,
                              { 'border-danger': errorCourse }
                            )}
                            list="course-list"
                            placeholder={courseInput}
                            onChange={handleCourseInputChange}
                          />
                          <datalist id="course-list">
                            {allCourses.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                          <div className="input-group-append">
                            <Button variant="info" onClick={handleCourseAdd}>
                              +
                            </Button>
                          </div>
                        </div>
                        {errorCourse ? (
                          <div className={styles.error}>{errorCourse}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-8 offset-md-4">
                        <ul className="d-flex flex-wrap justify-content-between p-0">
                          {courses.map(({ id, name }) => (
                            <li
                              className={classNames(
                                styles['list-element'],
                                'd-flex bg-light border border-outline-secondary rounded'
                              )}
                              key={id}
                              data-courseid={id}
                              data-coursename={name}
                            >
                              {name}
                              <button
                                className="btn p-0 ml-auto mr-2 text-dark"
                                type="button"
                                onClick={handleCourseDelete}
                              >
                                &#10005;
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4">
                        <Button
                          className={classNames(
                            'w-100',
                            styles['disable-button']
                          )}
                          onClick={handleShowModal}
                          disabled={
                            !isValid ||
                            dirty ||
                            editedIsLoading ||
                            deletedIsLoading
                          }
                        >
                          Disable
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <button
                          disabled={!formIsChanged && !dirty}
                          className={classNames(
                            'w-100 btn btn-secondary',
                            styles.button
                          )}
                          type="reset"
                          onClick={resetInput}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="col-md-3 col-4">
                        <button
                          className={classNames(
                            'w-100 btn ',
                            styles.button,
                            styles.submit
                          )}
                          type="submit"
                          disabled={
                            !isValid ||
                            (!formIsChanged && !dirty) ||
                            editedIsLoading ||
                            deletedIsLoading ||
                            errors.firstName ||
                            errors.lastName ||
                            errors.email
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={onFire}
                onClose={handleCloseModal}
                submitButtonText="Delete"
                useRedButton
                marginLeft
              >
                Are you sure you want to fire this mentor?
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
