import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import {
  editLessonSelector,
  studentsSelector,
  loadStudents,
  editLesson,
  lessonByIdSelector,
  fetchLessonById,
  loadStudentGroupById, loadStudentGroupByIdSelector,
} from '@/models';
import { useActions, paths } from '@/shared';

import { WithLoading } from '@/components';
import { editLessonValidation } from '@features/validation/validation-helpers';
import { addAlert } from '@/features';
import { Formik, Field, Form, FieldArray } from 'formik';
import { commonHelpers } from '@/utils';

import classNames from 'classnames';
import styles from './edit-lesson.scss';

export const EditLesson = () => {
  const history = useHistory();
  const { id } = useParams();

  // const [studentsGroup, setStudentsGroup] = useState(null);
  const [studentsGroupInput, setStudentsGroupInput] = useState('');
  // const [lessonOnEdit, setLessonOEdit] = useState(false);
  const [formData, setFormData] = useState([]);

  const [
    loadLessonById,
    getGroup,
    getStudents,
    updateLesson,
    dispatchAddAlert,
  ] = useActions([fetchLessonById, loadStudentGroupById, loadStudents, editLesson, addAlert]);

  const {
    data: group,
    isLoading: groupIsLoading,
    isLoaded: groupIsLoaded,
    error: groupError,
  } = useSelector(loadStudentGroupByIdSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(studentsSelector, shallowEqual);

  const {
    data: lesson,
    isLoading: lessonIsLoading,
    isLoaded: lessonIsLoaded,
    error: lessonError,
  } = useSelector(lessonByIdSelector, shallowEqual);

  const {
    isLoaded: editIsLoaded,
    error: editError,
  } = useSelector(editLessonSelector, shallowEqual);

  useEffect(() => {
    if (!lessonIsLoaded && !lessonError) {
      console.log('id', id);
      loadLessonById(id);
    }
  }, [lessonIsLoaded, lessonError, loadLessonById]);

  useEffect(() => {
    if (lessonIsLoaded && !lessonError) {
      console.log('lesson.studentGroupId', lesson.studentGroupId);
      console.log('lesson', lesson);
      getGroup(lesson.studentGroupId)
    }
  }, [lessonIsLoaded, lessonError, getGroup]);

  useEffect(() => {
    if (!studentsIsLoaded && !studentsError && groupIsLoaded) {
      getStudents();
    }
  }, [studentsError, studentsIsLoaded, getStudents]);

  useEffect(() => {
      if (Object.keys(lesson).length === 0) {
        history.push(paths.NOT_FOUND);
      }
  }, [lesson]);

  const getFormData = () => {
    const uniqueIds = [...new Set(group.studentIds)];

    lesson.lessonVisits.map((student) => {
      if (student.comment === null) student.comment = '';
      if (student.studentMark === null) student.studentMark = '';
    });

    const studentD = uniqueIds.map((id) => students.find((student) => student.id === id));

    const studentsData = studentD.map((student) => (
      {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
      }
    ));

    const resultLessonVisits = studentsData.sort((a, b) => {
      if (a.studentName < b.studentName) {
        return -1;
      }
      if (a.studentName > b.studentName) {
        return 1;
      }
    })
      .map((student, index) => ({
        ...lesson.lessonVisits[index],
        ...student,
      }));
    setFormData(resultLessonVisits);
  };

  useEffect(() => {
    if (lesson && group && students.length !== 0) {
      // const groupRes = groups?.find((group) => group.id === lesson.studentGroupId);
      setStudentsGroupInput(!group ? '' : group.name);
          getFormData();
    }
  }, [group, students, lesson]);



  useEffect(() => {
    if (!editError && editIsLoaded) {
      history.push(paths.LESSONS);
      dispatchAddAlert('The lesson has been edited successfully', 'success');
    }
    if (editError && !editIsLoaded) {
      dispatchAddAlert(editError);
    }
  }, [dispatchAddAlert, editError, editIsLoaded, history]);

  const openStudentDetails = useCallback((studentId) => {
    history.push(`${paths.STUDENTS_DETAILS}/${studentId}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  const onSubmit = (values) => {
      const { lessonDate, themeName, formData } = values;
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
      const theme = commonHelpers.capitalizeTheme(!themeName ? 'text' : themeName);
      const formalizedDate = commonHelpers.transformDateTime({ isRequest:true, dateTime: lessonDate }).formDateTimeForRequest;
    console.log('formalizedDate', formalizedDate);

      const lessonObject = {
        themeName: theme,
        lessonDate: formalizedDate,
        lessonVisits,
      };
      if (lessonObject) {
        // updateLesson(lessonObject, id);
      }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    formData[arrIndex].presence = !formData[arrIndex].presence;
    formData[arrIndex].studentMark = '';
  };

  const handleMarkChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const mark = Number(ev.target.value);
    if (mark > 0 && mark < 13) {
      formData[arrIndex].studentMark = mark;
    } else {
      formData[arrIndex].studentMark = 0;
    }
  };

  return (
    <div className="container" >
      <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
        <div className="d-flex flex-row">
          {groupError && lessonError && editError && studentsError && (
            <div className="col-12 alert-danger">
              Server Problems
            </div>
          )}
          <div className="col-12">
            <h3>Edit a Lesson</h3>
            <hr />
            <WithLoading
              isLoading={
                lessonIsLoading
                || studentsIsLoading
                || groupIsLoading
                || !lesson
                || !formData.length
              }
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                initialValues={{
                  themeName: lesson.themeName,
                  groupName: group.name,
                  lessonDate: commonHelpers.transformDateTime({ dateTime: lesson.lessonDate }).formInitialValue,
                  formData,
                }}
                onSubmit={onSubmit}
                validationSchema={editLessonValidation}
              >
                {({ errors }) => (
                  <Form id="form" className={classNames(styles.size)}>
                    <div className="d-flex flex-sm-column flex-lg-row">
                      <div className="col-lg-6">
                        <div className="mt-3 form-group row">
                          <label
                            htmlFor="inputLessonTheme"
                            className="col-sm-4 col-form-label"
                          >Lesson Theme:
                          </label>
                          <div className="col-sm-8">
                            <Field
                              type="text"
                              className={classNames('form-control', { 'border-danger': errors.themeName })}
                              name="themeName"
                              id="inputLessonTheme"
                            />
                            { errors.themeName ? <div className={styles.error}>{errors.themeName}</div> : null }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputGroupName" className="col-md-4 col-form-label">Group
                            Name:
                          </label>
                          <div className="col-sm-8 input-group">
                            <Field
                              name="groupName"
                              id="inputGroupName"
                              type="text"
                              className="form-control group-input"
                              value={group.name}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-md-4 col-form-label"
                            htmlFor="choose-date/time"
                          >Lesson Date/Time:
                          </label>
                          <div className="col-md-8">
                            <Field
                              className="form-control"
                              type="datetime-local"
                              name="lessonDate"
                              id="choose-date/time"
                              max={commonHelpers.transformDateTime({}).formInitialValue }
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <FieldArray name="formData">
                          {() => (
                            <div className={classNames(styles.list, 'col-lg-12')}>
                              <table className="table table-bordered table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col" aria-label="first_col" />
                                    <th scope="col">Full Student`s Name</th>
                                    <th scope="col" className="text-center">Mark</th>
                                    <th scope="col" className="text-center">Presence
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData && formData.length > 0 && (
                                    formData.map((lessonVisit, index) => (
                                      <tr key={lessonVisit.studentId}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                          <p
                                            className={classNames(styles.link)}
                                            onClick={() => openStudentDetails(lessonVisit.studentId)}
                                          >
                                            {lessonVisit.studentName}
                                          </p>
                                        </td>
                                        <td>
                                          <Field
                                            name={`formData[${index}].studentMark`}
                                            type="number"
                                            className={classNames(
                                              'form-control',
                                              styles.mode,
                                            )}
                                            max="12"
                                            min="0"
                                            data-id={index}
                                            disabled={!formData[index].presence}
                                            onBlur={handleMarkChange}
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`formData[${index}].presence`}
                                            className={styles.mode}
                                            type="checkbox"
                                            onClick={handlePresenceChange}
                                            data-id={index}
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
                    </div>
                    <div className={classNames(styles.placement, 'col-12 ')}>
                      <button
                        data-testid='cancelBtn'
                        form="form"
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={handleCancel}
                      >Cancel
                      </button>
                      <button
                          data-testid='submitBtn'
                          form="form"
                          type="submit"
                          className="btn btn-success btn-lg"
                      >Save
                      </button>
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
