import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import {
  editLessonSelector, studentsSelector, loadStudentGroupsSelector, lessonsSelector,
  fetchLessons, globalLoadStudentGroups, loadStudents, editLesson,
} from '@/models';
import { useActions, paths } from '@/shared';

import { WithLoading } from '@/components';
import { editLessonValidation, studentsFormDataValidation } from '@features/validation/validation-helpers';
import { addAlert } from '@/features';
import { Formik, Field, Form, FieldArray } from 'formik';
import { commonHelpers } from '@/utils';

import classNames from 'classnames';
import styles from './edit-lesson.scss';

export const EditLesson = () => {
  const history = useHistory();
  const { id } = useParams();

  const [studentsGroup, setStudentsGroup] = useState(null);
  const [studentsGroupInput, setStudentsGroupInput] = useState('');
  const [lessonOnEdit, setLessonOEdit] = useState(false);
  const [formData, setFormData] = useState([]);

  const [
    getGroups,
    getStudents,
    loadLessons,
    updateLesson,
    dispatchAddAlert,
  ] = useActions([globalLoadStudentGroups, loadStudents, fetchLessons, editLesson, addAlert]);

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
    data: lessons,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
    error: lessonsError,
  } = useSelector(lessonsSelector, shallowEqual);

  const {
    isLoaded: editIsLoaded,
    error: editError,
  } = useSelector(editLessonSelector, shallowEqual);

  useEffect(() => {
    if (!lessonsIsLoaded && !lessonsError) {
      loadLessons();
    }
  }, [lessonsIsLoaded, lessonsError, loadLessons]);

  useEffect(() => {
    if (lessonsIsLoaded) {
      const lessonRes = lessons.find((lesson) => lesson.id === Number(id));
      if (!lessonRes) {
        history.push(paths.NOT_FOUND);
      } else {
        setLessonOEdit(lessonRes);
      }
    }
  }, [lessonsIsLoaded, lessonOnEdit, studentsGroup]);

  const getFormData = () => {
    const uniqueIds = [...new Set(studentsGroup.studentIds)];

    lessonOnEdit.lessonVisits.map((student) => {
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
        ...lessonOnEdit.lessonVisits[index],
        ...student,
      }));
    setFormData(resultLessonVisits);
  };

  useEffect(() => {
    if (lessonOnEdit && groups.length) {
      const groupRes = groups?.find((group) => group.id === lessonOnEdit.studentGroupId);
      setStudentsGroupInput(!groupRes ? '' : groupRes.name);
      if (groupRes && studentsIsLoaded && !studentsIsLoading) {
        setStudentsGroup(groupRes);
        if (studentsGroup && students) {
          getFormData();
        }
      }
    }
  }, [groups, students, studentsIsLoaded, studentsIsLoading, lessonOnEdit, studentsGroup]);

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

  const onSubmit = async (values) => {
    try {
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

      await studentsFormDataValidation.validate(lessonVisits);

      const theme = commonHelpers.capitalizeTheme(!themeName ? 'text' : themeName);
      // console.log(commonHelpers.transformDateTime(2))
      const lessonObject = {
        themeName: theme,
        lessonDate: new Date(lessonDate).toISOString(),
        lessonVisits,
      };
      if (lessonObject) {
        await updateLesson(lessonObject, id);
      }
    } catch (err) {
      dispatchAddAlert(err.errors);
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
    <div className="container">
      <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
        <div className="d-flex flex-row">
          {groupsError && lessonsError && editError && studentsError && (
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
                || groupsIsLoading
                || !lessonOnEdit
                || !formData.length
              }
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                initialValues={{
                  themeName: lessonOnEdit?.themeName,
                  groupName: groups?.find((group) => group.id === lessonOnEdit.studentGroupId)?.name,
                  lessonDate: commonHelpers.transformDateTime(1, lessonOnEdit?.lessonDate),
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
                              value={studentsGroupInput}
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
                              max={commonHelpers.transformDateTime(1)}
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
                        form="form"
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={handleCancel}
                      >Cancel
                      </button>
                      <button form="form" type="submit" className="btn btn-success btn-lg">Save
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
