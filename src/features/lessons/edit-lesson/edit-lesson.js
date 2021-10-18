import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import {
  fetchLessons,
  lessonsSelector,
  editLessonSelector,
  studentsSelector,
  loadStudents,
  editLesson,
  loadStudentGroupById,
  loadStudentGroupByIdSelector,
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
  const [lessonOnEdit, setLessonOnEdit] = React.useState({});

  const [
    loadLessons, // not getById, cos of mistake in fetch response (lesson.theme === null)
    getGroup,
    getStudents,
    updateLesson,
    dispatchAddAlert,
  ] = useActions([fetchLessons, loadStudentGroupById, loadStudents, editLesson, addAlert]);

  const {
    data: lessons,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
    error: lessonsError,
  } = useSelector(lessonsSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(studentsSelector, shallowEqual);

  const {
    data: group,
    isLoading: groupIsLoading,
    isLoaded: groupIsLoaded,
    error: groupError,
  } = useSelector(loadStudentGroupByIdSelector, shallowEqual);

  const {
    isLoaded: editIsLoaded,
    error: editError,
  } = useSelector(editLessonSelector, shallowEqual);

  useEffect(() => {
      getStudents();
      loadLessons();
  }, []);

  React.useEffect(() => {
    if (lessonsIsLoaded && studentsIsLoaded) {
      const lesson = lessons.find((lesson) => lesson.id === Number(id));
      if(lesson !== undefined) {
        const lessonOnEdit = cloneDeep(lesson);
        lessonOnEdit.lessonVisits.forEach((student) => {
          if (student.comment === null) student.comment = '';
          if (student.studentMark === null) student.studentMark = '';
          const studentData = students.find((stud) => stud.id === student.studentId);
          student.studentName = `${studentData.firstName} ${studentData.lastName}`;
          return student
        });
        lessonOnEdit.lessonVisits.sort((a, b) => a.studentName.localeCompare(b.studentName));
        setLessonOnEdit(lessonOnEdit);
        getGroup(lesson.studentGroupId);
      } else {
        history.push(paths.NOT_FOUND);
      }
    }
  }, [lessonsIsLoaded, studentsIsLoaded, setLessonOnEdit, history]);

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
      const { lessonDate, themeName } = values;
      const lessonVisits = values.formData.map((lessonVisit) => {
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
      }).sort((a, b) => a.studentId - b.studentId);
      const theme = commonHelpers.capitalizeTheme(!themeName ? 'text' : themeName);
      const formalizedDate = commonHelpers.transformDateTime({ isRequest:true, dateTime: lessonDate }).formDateTimeForRequest;

      const lessonObject = {
        themeName: theme,
        lessonDate: formalizedDate,
        lessonVisits,
      };
      if (lessonObject) {
        updateLesson(lessonObject, id);
      }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const lessonOnEditChange = {...lessonOnEdit};
    lessonOnEditChange.lessonVisits[arrIndex].presence = !lessonOnEdit.lessonVisits[arrIndex].presence;
    lessonOnEditChange.lessonVisits[arrIndex].studentMark = '';
    setLessonOnEdit(lessonOnEditChange);
  };

  const handleMarkChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    let mark = Number(ev.target.value);
    if (mark < 0 || mark > 12) {
      mark = 0;
    }
    const lessonOnEditChange = {...lessonOnEdit};
    lessonOnEditChange.lessonVisits[arrIndex].studentMark = mark;
    setLessonOnEdit(lessonOnEditChange);
  };

  return (
    <div className="container" data-testid='editLessonRenderForm'>
      <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
        <div className="d-flex flex-row">
          {groupError && lessonsError && editError && studentsError && (
            <div className="col-12 alert-danger">
              Server Problems
            </div>
          )}
          <div className="col-12">
            <h3>Edit a Lesson</h3>
            <hr />
            <WithLoading
              isLoading={
                lessonsIsLoading
                || studentsIsLoading
                || groupIsLoading
                || !lessons
              }
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                data-testid='formik'
                initialValues={{
                  themeName: lessonOnEdit.themeName,
                  groupName: group.name,
                  lessonDate: commonHelpers.transformDateTime({ dateTime: lessonOnEdit.lessonDate }).formInitialValue,
                  formData: lessonOnEdit.lessonVisits,
                }}
                onSubmit={onSubmit}
                validationSchema={editLessonValidation}
              >
                {({ errors }) => (
                  <Form id="form" className={classNames(styles.size)} data-testid='editForm'>
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
                              data-testid='themeName'
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
                              data-testid='groupName'
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
                              data-testid='lessonDate'
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
                      <div className="col-lg-6 mt-2" >
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
                                <tbody data-testid='formData'>
                                  {lessonOnEdit.lessonVisits && lessonOnEdit.lessonVisits.length > 0 && (
                                      lessonOnEdit.lessonVisits.map((lessonVisit, index) => (
                                      <tr key={lessonVisit.studentId}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                          <p
                                            data-testid={lessonVisit.studentId}
                                            className={classNames(styles.link)}
                                            onClick={() => openStudentDetails(lessonVisit.studentId)}
                                          >
                                            {lessonVisit.studentName}
                                          </p>
                                        </td>
                                        <td>
                                          <Field
                                            data-testid={`formData[${index}].studentMark`}
                                            name={`formData[${index}].studentMark`}
                                            type="number"
                                            className={classNames(
                                              'form-control',
                                              styles.mode,
                                            )}
                                            max="12"
                                            min="0"
                                            data-id={index}
                                            disabled={!lessonOnEdit.lessonVisits[index].presence}
                                            onBlur={handleMarkChange}
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
                                            checked = {lessonOnEdit.lessonVisits[index].presence}
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
