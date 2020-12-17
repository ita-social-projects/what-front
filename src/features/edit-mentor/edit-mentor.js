import React, {useState, useEffect} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useActions } from '@shared/index.js';
import { WithLoading, Button } from '@components/index.js';
import {
  mentorIdSelector, mentorEditingSelector, mentorDeletingSelector, mentorGroupsSelector, mentorCoursesSelector,
  editMentor, deleteMentor,
} from '../../models/index.js';
import { Formik, Field, Form } from 'formik';
import { formValidate } from '../validation/validation-helpers.js';
import classNames from 'classnames';
import styles from './edit-mentor.scss';
import Icon from "@/icon";

export const EditMentor = ({id}) => {
  const {
    data: mentor,
    isLoading: mentorIsLoading,
    isLoaded: mentorIsLoaded,
  } = useSelector(mentorIdSelector, shallowEqual);
  
  const {
    data: mentorGroups,
    isLoading: groupsAreLoading,
    isLoaded: groupsAreLoaded,
  } = useSelector(mentorGroupsSelector, shallowEqual);
  
  const {
    data: mentorCourses,
    isLoading: coursesAreLoading,
    isLoaded: coursesAreLoaded,
  } = useSelector(mentorCoursesSelector, shallowEqual);
  
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
  
  useEffect(() => {
    if (!mentor && mentorIsLoading && mentorIsLoaded) {
      history.push('/404');
    }
    if (!editedIsError && editedIsLoaded || !deletedIsError && deletedIsLoaded) {
      history.push('/mentors');
    }
  }, [mentor, mentorIsLoading, mentorIsLoaded, editedIsError, editedIsLoaded, deletedIsError, deletedIsLoaded ]);
  
  const history = useHistory();
  
  const [updateMentor, removeMentor] = useActions([editMentor, deleteMentor]);
  const [groups, setGroups] = useState(mentorGroups || 0);
  const [courses, setCourses] = useState(mentorGroups || 0);
  const [groupInput, setGroupInputValue] = useState('Type name of a group');
  const [courseInput, setCourseInputValue] = useState('Type name of a course');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setGroups(mentorGroups),
    setCourses(mentorCourses)
  }, [mentorGroups, mentorCourses])
  
  const handleGroupInputChange = (e) => {
    setError('');
    const { value } = e.target;
    setGroupInputValue(value);
  };
  
  const handleCourseInputChange = (e) => {
    setError('');
    const { value } = e.target;
    setCourseInputValue(value);
  };
  
  const handleGroupAdd = () => {
    const checkName = groups.find((el) => el.name === groupInput);
    if (checkName) {
      setError('This group was already added to the list');
    } else {
      const groupObject = mentorGroups.find((el) => el.name === groupInput);
      if (groupObject) {
        const res = [
          ...groups,
          groupObject,
        ];
        setGroups(res);
      } else {
        setError('Invalid group name');
      }
    }
  };
  
  const handleCourseAdd = () => {
    const checkName = courses.find((el) => el.name === courseInput);
    if (checkName) {
      setError('This course was already added to the list');
    } else {
      const courseObject = mentorCourses.find((el) => el.name === courseInput);
      if (courseObject) {
        const res = [
          ...courses,
          courseObject,
        ];
        setCourses(res);
      } else {
        setError('Invalid course name');
      }
    }
  };
  
  const handleGroupDelete = (e) => {
    setError('');
    const element = e.target.closest('li');
    const groupsList = groups.filter((el) => el.name !== element.dataset.groupname);
    setGroups(groupsList);
  };
  
  const handleCourseDelete = (e) => {
    setError('');
    const element = e.target.closest('li');
    const coursesList = courses.filter((el) => el.name !== element.dataset.coursename);
    setGroups(coursesList);
  };
  
  const validateEditMentor = (values) => {
    const { firstName, lastName, email } = values;
    const name = firstName[0].toUpperCase() + firstName.slice(1);
    const secondName= lastName[0].toUpperCase() + lastName.slice(1);
    const studentGroupIds = groups.map((el) => el.id);
    const courseIds = courses.map((el) => el.id);
    const editedMentor = {
      firstName: name,
      lastName: secondName,
      email,
      studentGroupIds,
      courseIds
    };
    updateMentor(id, editedMentor)
  };
  
  const onSubmit = (values, actions) => {
    actions.resetForm();
    setGroups(mentor.groups);
    setCourses(mentor.courses);
    validateEditMentor(values);
  };
  
  const onFire = () => {
    removeMentor(id)
  };
  
  const resetInput = () => {
    setGroups(mentor.groups);
    setCourses(mentor.course);
  };
  
  
  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h3>Mentor Editing</h3>
            <hr />
            <WithLoading isLoading={mentorIsLoading || !mentorIsLoaded}
                         className='d-block mx-auto'
            >
              <Formik
                initialValues={{
                  firstName: mentor?.firstName,
                  lastName: mentor?.lastName,
                  email: mentor?.email,
                  studentGroupIds: mentor?.studentGroupIds,
                  courseIds: mentor?.courseIds
                }}
                validationSchema={formValidate}
                onSubmit={onSubmit}
              >
                {({ values, errors }) => (
                  <Form>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="firstName">First Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames("form-control", { "border-danger": errors.firstName })}
                          name="firstName"
                          id="firstName"
                          value={values.firstName}
                        />
                        { errors.firstName ? <div className={styles.error}>{errors.firstName}</div> : null }
                      </div>
                    </div>
                  
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="lastName">Last Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames("form-control", { "border-danger": errors.lastName })}
                          name="lastName"
                          id="lastName"
                          value={values.lastName}
                        />
                        { errors.lastName ? <div className={styles.error}>{errors.lastName}</div> : null }
                      </div>
                    </div>
                  
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="email">Email:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="email"
                          className={classNames("form-control", { "border-danger": errors.email })}
                          name="email"
                          id="email"
                          value={values.email}
                        />
                        { errors.email ? <div className={styles.error}>{errors.email}</div> : null }
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
                              "form-control col-md-11 w-75",
                              { "border-danger": error },
                            )}
                            list="group-list"
                            placeholder={groupInput}
                            onChange={handleGroupInputChange}
                          />
                          <datalist id="group-list">
                            {mentorGroups.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                          <div className="input-group-append">
                            <Button variant="warning" onClick={handleGroupAdd}><Icon icon="Plus" /></Button>
                          </div>
                        </div>
                        { error ? <div className={styles.error}>{error}</div> : null}
                      </div>
                    </div>
                    <WithLoading isLoading={groupsAreLoading || !groupsAreLoaded}
                                 className='d-block mx-auto'
                    >
                      <div className="row m-0 pt-3">
                        <div className="col-md-8 offset-md-4">
                          <ul className="d-flex flex-wrap justify-content-between p-0">
                            {groups.map(({ id, name }) => (
                              <li
                                className={classNames(styles["list-element"],
                                  "d-flex bg-light border border-outline-secondary rounded")}
                                key={id}
                                data-groupid={id}
                                data-groupname={name}
                              >{name}
                                <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger"
                                        type="button"
                                        onClick={handleGroupDelete}>&#215;</button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </WithLoading>
  
  
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
                              "form-control col-md-11 w-75",
                              { "border-danger": error },
                            )}
                            list="course-list"
                            placeholder={courseInput}
                            onChange={handleCourseInputChange}
                          />
                          <datalist id="course-list">
                            {mentorCourses.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                          <div className="input-group-append">
                            <Button variant="warning" onClick={handleCourseAdd}><Icon icon="Plus" /></Button>
                          </div>
                        </div>
                        { error ? <div className={styles.error}>{error}</div> : null}
                      </div>
                    </div>
                    <WithLoading isLoading={coursesAreLoading || !coursesAreLoaded}
                                 className='d-block mx-auto'
                    >
                      <div className="row m-0 pt-3">
                        <div className="col-md-8 offset-md-4">
                          <ul className="d-flex flex-wrap justify-content-between p-0">
                            {courses.map(({ id, name }) => (
                              <li
                                className={classNames(styles["list-element"],
                                  "d-flex bg-light border border-outline-secondary rounded")}
                                key={id}
                                data-courseid={id}
                                data-coursename={name}
                              >{name}
                                <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger"
                                        type="button"
                                        onClick={handleCourseDelete}>&#215;</button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </WithLoading>
                    
                    
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4">
                        <Button className="w-100" variant="danger"
                                onClick={onFire}
                                disabled={editedIsLoading || deletedIsLoading}
                        >Fire</Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <button
                          className={classNames("w-100 btn btn-secondary", styles.button)}
                          type="reset"
                          onClick={resetInput}
                        >Clear
                        </button>
                      </div>
                      <div className="col-md-3 col-4">
                        <button className={classNames("w-100 btn btn-success", styles.button)}
                                type="submit"
                                disabled={editedIsLoading || deletedIsLoading ||
                                errors.firstName || errors.lastName || errors.email}
                        >Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};