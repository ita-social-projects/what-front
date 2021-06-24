import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { useActions, paths } from '@/shared';
import cloneDeep from 'lodash.clonedeep';
import {
  mentorsActiveSelector, studentsSelector, loadStudentGroupsSelector,
  addLessonSelector, fetchActiveMentors, globalLoadStudentGroups,
  loadStudents, addLesson,
} from '@/models/index.js';

import { Button, WithLoading } from '@/components';
import { addLessonValidation } from '@features/validation/validation-helpers.js';
import { addAlert } from '@/features';
import { Formik, Field, Form, FieldArray } from 'formik';
import { commonHelpers } from '@/utils';

import classNames from 'classnames';
import styles from './add-lesson.scss';

export const AddLesson = () => {
  const history = useHistory();

  const [markError, setMarkError] = React.useState(false);
  const [mentorError, setMentorError] = React.useState(false);
  const [groupError, setGroupError] = React.useState(false);
  const [studentsGroup, setStudentsGroup] = React.useState(null);
  const [mentorInput, setMentorInput] = React.useState('');
  const [btnSave, setBtnSave] = React.useState(false);
  const [classRegister, setClassRegister] = React.useState(false);
  const [formData, setFormData] = React.useState([]);

  const {
    data: mentors,
    isLoading: mentorsIsLoading,
    isLoaded: mentorsIsLoaded,
    error: mentorsError,
  } = useSelector(mentorsActiveSelector, shallowEqual);

  const {
    data: groups,
    isLoading: groupsIsLoading,
    isLoaded: groupsIsLoaded,
    error: groupsError,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(studentsSelector, shallowEqual);

  const {
    isLoaded: addIsLoaded,
    isLoading: lessonIsLoading,
    error: addError,
  } = useSelector(addLessonSelector, shallowEqual);

  const [
    getMentors,
    getGroups,
    getStudents,
    createLesson,
    dispatchAddAlert,
  ] = useActions([fetchActiveMentors, globalLoadStudentGroups, loadStudents, addLesson, addAlert]);

  useEffect(() => {
      getMentors();
      getGroups();
      getStudents();
  }, []);

  useEffect(() => {
    if (!addError && addIsLoaded) {
      history.push(paths.LESSONS);
      dispatchAddAlert('The lesson has been added successfully!', 'success');
    }
    if (addError && !addIsLoaded) {
      dispatchAddAlert(addError);
    }
  }, [addError, addIsLoaded, dispatchAddAlert, history]);

  const openStudentDetails = useCallback((id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  const onSubmit = (values) => {
      const { lessonDate, themeName } = values;
      const lessonVisits = formData.map((lessonVisit) => {
        const {
          presence, studentId, studentMark,
        } = lessonVisit;
        return (
          {
            comment: '',
            presence,
            studentId,
            studentMark: studentMark || null,
          }
        );
      });

      const mentorData = mentors.find((mentor) => mentor.email === mentorInput);

      const theme = commonHelpers.capitalizeTheme(themeName);
      const formalizedDate = commonHelpers.transformDateTime({ isRequest: true, dateTime: lessonDate }).formDateTimeForRequest;

      const lessonObject = {
        lessonDate: formalizedDate,
        themeName: theme,
        lessonVisits,
        studentGroupId: studentsGroup.id,
        mentorId: mentorData.id,
      };
      if (!mentorsError && lessonObject) {
        createLesson(lessonObject);
      }
  };

  const getFormData = (studentsGroup, students) => {
    const uniqueIds = [...new Set(studentsGroup.studentIds)];

    const studentD = uniqueIds.map(
      (id) => students.find((student) => student.id === id),
    );

    const activeStudents = studentD.filter((student) => student !== undefined);

    const studentsData = activeStudents.map((student) => (
      {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
      }
    ));

    return studentsData.map((student) => ({
      ...student,
      studentMark: 0,
      presence: false,
      comment: '',
    }));
  };

  const openClassRegister = useCallback(() => {
    if (studentsGroup) {
      setFormData(getFormData(studentsGroup, students));
      setBtnSave(true);
      setClassRegister(true);
      setGroupError(false);
    }
    !studentsGroup && setCorrectError('#inputGroupName', setGroupError, 'group name');
    !mentorInput && setCorrectError('#mentorEmail', setMentorError, 'mentor email');
  }, [studentsGroup, students, mentorInput, setGroupError, setMentorError, setBtnSave, setClassRegister, setGroupError]);

  const setCorrectError = (inputSelector, setError, fieldName) => {
    const {value} = document.querySelector(inputSelector);
    value ? setError(`Invalid ${fieldName}`) : setError('This field is required');
  };

  const handleMentorChange = (ev) => {
    setMentorInput(ev.target.value);
    const mentorData = mentors.find((mentor) => mentor.email === ev.target.value);

    mentorData ? setMentorError(false)
      : setCorrectError('#mentorEmail', setMentorError, 'mentor email');
  };

  const handleGroupChange = (ev) => {
    const resultGroup = groups.find((group) => group.name.toUpperCase() === ev.target.value.toUpperCase());
    if (resultGroup) {
      setStudentsGroup(resultGroup);
      setGroupError(false);
      setBtnSave(false);
      setClassRegister(false);
    } else {
      setCorrectError('#inputGroupName', setGroupError, 'group name');
    }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const newFormData = cloneDeep(formData);
    newFormData[arrIndex].presence = !newFormData[arrIndex].presence;
    newFormData[arrIndex].studentMark = 0;
    setFormData(newFormData);
  };

  const handleMarkChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const mark = Number(ev.target.value);
    if (mark > 0 && mark < 13) {
      const newFormData = cloneDeep(formData);
      newFormData[arrIndex].studentMark = mark;
      setFormData(newFormData);
      setMarkError(false);
    } else {
      setMarkError(true);
      ev.target.value = '';
    }
  };

  return (
    <div className="container">
      <div className={classNames(styles.page, 'mx-auto', `${classRegister ? 'col-12' : 'col-8'}`)}>
        <div className="d-flex flex-row">
          {groupsError && mentorsError && studentsError && (
            <div className="col-12 alert-danger">
              Server Problems
            </div>
          )}
          <div className='col-12'>
            <h3>Add a Lesson</h3>
            <hr />
            <WithLoading
              isLoading={
                mentorsIsLoading
                || studentsIsLoading
                || groupsIsLoading
                || lessonIsLoading
              }
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                initialValues={{
                  themeName: '',
                  groupName: '',
                  lessonDate: '',
                  mentorEmail: '',
                  formData,
                }}
                onSubmit={onSubmit}
                validationSchema={addLessonValidation}
              >
                {({ errors, touched, setFieldTouched }) => (
                  <Form id="form" className={classNames(styles.size)}>
                    <div className='d-flex flex-sm-column flex-lg-row' data-testid='addForm'>
                      <div className={classRegister ? 'col-lg-6' : 'col-lg-12'}>
                        <div className="mt-3 form-group row">
                          <label htmlFor="inputLessonTheme" className="col-md-4 col-form-label">Lesson Theme:</label>
                          <div className="col-md-8">
                            <Field
                              type="text"
                              className={classNames('form-control',
                                { 'border-danger': !!(errors.themeName && touched.themeName) })}
                              name="themeName"
                              id="inputLessonTheme"
                              placeholder="Lesson Theme"
                              required
                            />
                            {
                              errors.themeName
                              && <div className={styles.error}>{errors.themeName}</div>
                            }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputGroupName" className="col-md-4 col-form-label">Group Name:</label>
                          <div className="col-md-8 input-group">
                            <input
                              name="groupName"
                              id="inputGroupName"
                              type="text"
                              className={classNames('form-control group-input', { 'border-danger': !!groupError })}
                              placeholder="Group Name"
                              onChange={handleGroupChange}
                              list="group-list"
                              disabled={groupsIsLoading}
                              required
                            />
                            <datalist id="group-list">
                              {groups.map(({ id, name }) => (
                                <option key={id}>{name}</option>
                              ))}
                            </datalist>
                          </div>
                          {
                            groupError
                              ? <div id='group-error' className={classNames('col-8 offset-4', styles.error)}>{groupError}</div>
                              : null
                          }
                        </div>
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label" htmlFor="choose-date/time">Lesson Date/Time:</label>
                          <div className="col-md-8">
                            <Field
                              className="form-control"
                              type="datetime-local"
                              name="lessonDate"
                              id="choose-date-time"
                              max={ commonHelpers.transformDateTime({}).formInitialValue }
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label" htmlFor="mentorEmail">Mentor Email:</label>
                          <div className="col-md-8 input-group">
                            <input
                              className={classNames('form-control group-input', { 'border-danger': !!mentorError })}
                              type="text"
                              name="mentorEmail"
                              id="mentorEmail"
                              list="mentor-list"
                              placeholder="Mentor Email"
                              onChange={handleMentorChange}
                              disabled={mentorsIsLoading}
                              required
                            />
                            <datalist id="mentor-list">
                              {mentors.map(({ id, firstName, lastName, email }) => (
                                <option key={id} value={email}>
                                  {`${firstName} ${lastName}`}
                                </option>
                              ))}
                            </datalist>
                          </div>
                          {
                            mentorError
                              ? <div id='mentor-error' className={classNames('col-8 offset-4', styles.error)}>{mentorError}</div>
                              : null
                          }
                        </div>
                      </div>
                      {classRegister && formData && (
                        <div className={classRegister ? 'col-lg-6' : 'col-lg-12'}>
                          <FieldArray name="formData">
                            {() => (
                              <div className={classNames(styles.list, 'col-lg-12 pt-2')}>
                                <table className="table table-bordered table-hover" data-testid='students-form'>
                                  <thead>
                                    <tr>
                                      <th scope="col" aria-label="first_col" />
                                      <th scope="col">Full Student`s Name</th>
                                      <th scope="col" className="text-center">Mark</th>
                                      <th scope="col" className="text-center">Presence</th>
                                    </tr>
                                  </thead>
                                  <tbody data-testid='students-formData-table'>
                                    {formData && formData.length > 0 && (
                                      formData.map((lessonVisit, index) => (
                                        <tr key={lessonVisit.studentId}>
                                          <th scope="row">{ index + 1 }</th>
                                          <td>
                                            <p
                                              data-testid={`openStudentDetails-${lessonVisit.studentId}`}
                                              className={classNames(styles.link)}
                                              onClick={() => openStudentDetails(lessonVisit.studentId)}
                                            >
                                              { lessonVisit.studentName }
                                            </p>
                                          </td>
                                          <td>
                                            <Field
                                              data-testid={`formData[${index}].studentMark`}
                                              name={`formData[${index}].studentMark`}
                                              className={classNames(
                                                'form-control',
                                                { 'border-danger': markError },
                                                styles.mode,
                                              )}
                                              type="number"
                                              max="12"
                                              min="0"
                                              placeholder=""
                                              onChange={handleMarkChange}
                                              data-id={index}
                                              disabled={!formData[index].presence}
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              data-testid={`formData[${index}].presence`}
                                              name={`formData[${index}].presence`}
                                              className={styles.mode}
                                              type="checkbox"
                                              onClick={handlePresenceChange}
                                              data-id={index}
                                              checked={formData[index].presence}
                                            />
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      )}
                    </div>
                    <div className='col-12 d-flex justify-content-between'>
                      <button form="form" data-testid='cancelBtn' type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>Cancel</button>
                      {btnSave
                        ? <button id='submit' form="form" type="submit" className="btn btn-success btn-lg">Save</button>
                        : (
                          <Button
                            id='class-register-btn'
                            className="btn btn-success btn-lg"
                            onClick={(event) => {
                              event.preventDefault();
                              setFieldTouched();
                              openClassRegister();
                            }}
                          >
                            Class Register
                          </Button>
                        )}
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
