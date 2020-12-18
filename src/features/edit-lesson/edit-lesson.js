import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  Formik, Field, Form, FieldArray,
} from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared';
import * as Yup from 'yup';
import { Button, WithLoading } from '@/components';
import {
  editLessonSelector,
  activeStudentsSelector,
  mentorsSelector,
  studentGroupsSelector,
  lessonsSelector,
  fetchActiveMentors,
  fetchLessons,
  globalLoadStudentGroups,
  loadActiveStudents,
  editLesson,
} from '../../models/index.js';
import styles from './edit-lesson.scss';

export const EditLesson = () => {
  const history = useHistory();

  const { id } = useParams();

  const [markError, setMarkError] = useState(false);
  const [mentorError, setMentorError] = useState(false);
  const [groupError, setGroupError] = useState(false);
  const [studentsGroup, setStudentsGroup] = useState(null);
  const [studentsGroupInput, setStudentsGroupInput] = useState('');
  const [mentorInfo, setMentor] = useState(null);
  const [btnSave, setBtnSave] = useState(false);
  const [classRegister, setClassRegister] = useState(false);
  const [lessonOnEdit, setLessonOEdit] = useState(false);

  const [
    getMentors,
    getGroups,
    getStudents,
    loadLessons,
    updateLesson,
  ] = useActions([fetchActiveMentors, globalLoadStudentGroups, loadActiveStudents, fetchLessons, editLesson]);

  const {
    data: mentors,
    isLoading: mentorsIsLoading,
    isLoaded: mentorsIsLoaded,
    error: mentorsError,
  } = useSelector(mentorsSelector, shallowEqual);

  /* const {
    data: groups,
    isLoading: groupsLoading,
    isLoaded: groupsIsLoaded,
    error: groupsError,
  } = useSelector(loadStudentGroupsSelector, shallowEqual); */

  const {
    studentGroups: groups,
    isLoading: groupsIsLoading,
    isLoaded: groupsIsLoaded,
    error: groupsError,
  } = useSelector(studentGroupsSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const {
    data: lessons,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
    error: lessonError,
  } = useSelector(lessonsSelector, shallowEqual);

  const {
    isLoading: editIsLoading,
    isLoaded: editIsLoaded,
    error: editError,
  } = useSelector(editLessonSelector, shallowEqual);

  useEffect(() => {
    if (!lessonsIsLoaded && !lessonError) {
      loadLessons();
    }
  }, [lessonsIsLoaded, lessonError, loadLessons]);

  useEffect(() => {
    if (lessonsIsLoaded) {
      const lessonRes = lessons.find((lesson) => lesson.id === Number(id));
      setLessonOEdit(lessonRes);
    }
  }, [lessonsIsLoaded, lessonOnEdit, mentorInfo, studentsGroup]);

  useEffect(() => {
    console.log(lessonOnEdit)
    if(lessonOnEdit && groups.length)
    {
      console.log(groups);
      const groupRes = groups?.find((group) => group.id === lessonOnEdit.studentGroupId);

      setStudentsGroupInput(groupRes.name || '');
    }
  }, [groups, lessonOnEdit]);

  useEffect(() => {
    if (!mentorsIsLoaded && !mentorsError) {
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

  /*useEffect(() => {
    if(mentors){
      const mentorD = mentors?.find((mentor) => mentor.id === lessonOnEdit.mentorId);
      setMentor(mentorD);
      console.log(mentorInfo);
    }
  }, [mentors]);*/

  const capitalizeTheme = (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

  const validateForm = Yup.object().shape({
    themeName: Yup.string()
      .min(2, 'Invalid lesson theme: too short')
      .max(50, 'Invalid lesson theme: too long')
      .matches(
        '^[A-Za-zа-яА-ЯёЁ ]+$',
        'Invalid lesson theme',
      ),
  });

  const openStudentDetails = useCallback((id) => {
    history.push(`/students/${id}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push('/lessons');
  }, [history]);

  const onSubmit = (values) => {
    console.log(values);
    /* const { lessonDate, themeName } = values;
    const lessonVisits = formData.map((lessonVisit) => {
      const {
        presence, studentId, studentMark,
      } = lessonVisit;
      return (
        {
          comment: '',
          presence,
          studentId,
          studentMark,
        }
      );
    });

    const mentorData = mentors.find((mentor) => mentor.email === mentorInput);

    const theme = capitalizeTheme(themeName);

    const lessonObject = {
      lessonDate,
      themeName: theme,
      lessonVisits,
      studentGroupId: studentsGroup.id,
      mentorId: mentorData.id,
    };

    if (!mentorsError && lessonObject) {
      updateLesson(lessonObject);
    } */
  };

  const getFormData = () => {
    const studentD = studentsGroup.studentIds.map(
      (id) => students.find((student) => student.id === id),
    );

    console.log(studentD);
    const studentsData = studentD.map((student) => ({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
    }));

    console.log(studentsData);

    console.log(lessonOnEdit);

    const resultLessonVisits = lessonOnEdit.lessonVisits.map((visit) => ({
      ...student,
      studentMark: 0,
      presence: false,
      comment: '',
    }));

    //setFormData(resultLessonVisits);
  };

  const openClassRegister = () =>{
      console.log(studentsGroup);
    if (studentsGroup) {
      getFormData();
      setBtnSave(true);
      setClassRegister(true);
      setGroupError(false);
    }
    if (!studentsGroup) {
      setGroupError(true);
    }
  };

  const hideClassRegister = () => {
    setBtnSave(false);
    setClassRegister(false);
    setGroupError(false);
  };

  const handleMentorChange = (ev) => {
    setMentorInput(ev.target.value);
    const mentorData = mentors.find((mentor) => mentor.email === ev.target.value);
    if (mentorData) {
      setMentorError(false);
    } else {
      setMentorError(true);
    }
  };

  const handleGroupChange = (ev) => {
    const resultGroup = groups.find((group) => group.name.toUpperCase() === ev.target.value.toUpperCase());
   setStudentsGroup(null);
    setStudentsGroupInput(ev.target.value);
    console.log(resultGroup);
    if (resultGroup) {
      setStudentsGroup(resultGroup);
      setGroupError(false);
      setBtnSave(false);
      setClassRegister(false);
    } else {
      setGroupError(true);
    }
  };

  const handleMarkChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const mark = Number(ev.target.value);
    if (mark > 0 && mark < 13) {
      lessonOnEdit[arrIndex].studentMark = mark;
      setMarkError(false);
    } else {
      setMarkError(true);
      ev.target.value = '';
    }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    lessonOnEdit[arrIndex].presence = !lessonOnEdit[arrIndex].presence;
    lessonOnEdit[arrIndex].studentMark = 0;
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
          <WithLoading isLoading={lessonsIsLoading || mentorsIsLoading || studentsIsLoading || groupsIsLoading }>
            <div className={`${classRegister ? 'col-6' : 'col-12'}`}>
              <Formik
                initialValues={{
                  themeName: lessonOnEdit?.themeName,
                  groupName: groups?.find((group) => group.id === lessonOnEdit.studentGroupId)?.name,
                  lessonD: lessonOnEdit?.lessonDate,
                  mentorEmail: mentorInfo?.email,
                  formData: lessonOnEdit?.lessonVisits,
                }}
                onSubmit={onSubmit}
                validationSchema={validateForm}
              >
                {({ values, errors }) => (
                  <Form id="form" className={classNames(styles.size, 'd-flex flex-row')}>
                    <div className="col-12">
                      <h3>Add a Lesson</h3>
                      <hr />
                      <div className="mt-5 form-group row">
                        <label htmlFor="inputLessonTheme" className="col-sm-4 col-form-label">Lesson Theme:</label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            className={classNames('form-control', { 'border-danger': errors.themeName })}
                            name="themeName"
                            id="inputLessonTheme"
                          />
                          {
                              errors.themeName
                                ? <div className={styles.error}>{errors.themeName}</div>
                                : null
                            }
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputGroupName" className="col-sm-4 col-form-label">Group Name:</label>
                        <div className="col-sm-8 input-group">
                          <Field
                            name="groupName"
                            id="inputGroupName"
                            type="text"
                            className={classNames('form-control group-input', { 'border-danger': groupError })}
                            onChange={handleGroupChange}
                            onFocus={hideClassRegister}
                            list="group-list"
                            disabled={groupsIsLoading}
                            value={studentsGroupInput}
                          />
                          <datalist id="group-list">
                            {groups.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                        </div>
                        {
                            groupError
                              ? <div className={classNames('col-8 offset-4', styles.error)}>Invalid group name</div>
                              : null
                          }
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Lesson Date/Time:</label>
                        <div className="col-md-8">
                          <Field
                            className="form-control"
                            type="datetime-local"
                            name="lessonD"
                            id="choose-date/time"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="mentorEmail">Mentor Email:</label>
                        <div className="col-md-8 input-group">
                          <input
                            className={classNames('form-control group-input', { 'border-danger': mentorError })}
                            type="text"
                            name="mentorEmail"
                            id="mentorEmail"
                            list="mentor-list"
                            onChange={handleMentorChange}
                            disabled={mentorsIsLoading}
                          />
                          <datalist id="mentor-list">
                            {mentors.map(({ id, email }) => (
                              <option key={id} value={email} />
                            ))}
                          </datalist>
                        </div>
                        {
                            mentorError
                              ? <div className={classNames('col-8 offset-4', styles.error)}>Invalid mentor email</div>
                              : null
                          }
                      </div>
                    </div>
                    { classRegister && (
                    <div className="col-lg-12">
                      <FieldArray name="formData">
                        {(arrayHelpers) => (
                          <div className="col-lg-12">
                            <table className="table table-bordered table-hover">
                              <thead>
                                <tr>
                                  <th scope="col" aria-label="first_col" />
                                  <th scope="col">Full Student`s Name</th>
                                  <th scope="col" className="text-center">Mark</th>
                                  <th scope="col" className="text-center">Presence</th>
                                </tr>
                              </thead>
                              <tbody>
                                { formData && formData.length > 0 && (
                                  formData.map((lessonVisit, index) => (
                                    <tr key={lessonVisit.studentId}>
                                      <th scope="row">{ index + 1 }</th>
                                      <td>
                                        <a href="#" onClick={() => openStudentDetails(lessonVisit.studentId)}>
                                          { lessonVisit.studentName }
                                        </a>
                                      </td>
                                      <td>
                                        <Field
                                          name={`formData[${index}].studentMark`}
                                          className={classNames(
                                            'form-control',
                                            { 'border-danger': markError },
                                            styles.mode,
                                          )}
                                          type="number"
                                          max="12"
                                          min="2"
                                          placeholder=""
                                          onChange={handleMarkChange}
                                          data-id={index}
                                          disabled={!formData[index].presence}
                                          required
                                        />
                                      </td>
                                      <td>
                                        <Field
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
                  </Form>
                )}
              </Formik>
            </div>
          </WithLoading>
        </div>
        <div className={classNames(styles.placement, 'col-12')}>
          <button form="form" type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>Cancel</button>
          {btnSave
            ? <button form="form" type="submit" className="btn btn-success btn-lg">Save</button>
            : (
              <Button
                className="btn btn-success btn-lg"
                onClick={openClassRegister}
              >
                Class Register
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};