import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  Formik, Field, Form, FieldArray,
} from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import * as Yup from 'yup';
import { WithLoading } from '@/components';
import {
  editLessonSelector,
  activeStudentsSelector,
  loadStudentGroupsSelector,
  lessonsSelector,
  fetchLessons,
  globalLoadStudentGroups,
  loadActiveStudents,
  editLesson,
} from '@/models';
import { addAlert } from '@/features';
import styles from './edit-lesson.scss';

export const EditLesson = () => {
  const history = useHistory();

  const { id } = useParams();

  const today = new Date().toISOString().split(".")[0];

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
  ] = useActions([globalLoadStudentGroups, loadActiveStudents, fetchLessons, editLesson, addAlert]);

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
  } = useSelector(activeStudentsSelector, shallowEqual);

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
      
    const resultLessonVisits = studentsData.sort((a, b) => {
      if(a.studentName < b.studentName) {
        return -1;
      }
      if(a.studentName > b.studentName) {
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
      setStudentsGroupInput(groupRes.name || '');
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

  const openStudentDetails = useCallback((studentId) => {
    history.push(`${paths.STUDENTS_DETAILS}/${studentId}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  const onSubmit = (values) => {
    const { lessonD, themeName } = values;
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

    const theme = capitalizeTheme(themeName);

    const lessonObject = {
      lessonDate: lessonD,
      themeName: theme,
      lessonVisits,
    };

    if (lessonObject) {
      updateLesson(lessonObject, id);
    }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    formData[arrIndex].presence = !formData[arrIndex].presence;
    formData[arrIndex].studentMark = 0;
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
            <div className="col-6">
              <h3>Edit a Lesson</h3>
              <hr />
              <Formik
                initialValues={{
                  themeName: lessonOnEdit?.themeName,
                  groupName: groups?.find((group) => group.id === lessonOnEdit.studentGroupId)?.name,
                  lessonD: lessonOnEdit?.lessonDate,
                  formData,
                }}
                onSubmit={onSubmit}
                validationSchema={validateForm}
              >
                {({ errors }) => (
                  <Form id="form" className={classNames(styles.size, 'd-flex flex-row')}>
                    <div className="col-12">
                      <div className="mt-3 form-group row">
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
                            className="form-control group-input"
                            value={studentsGroupInput}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Lesson Date/Time:</label>
                        <div className="col-md-8">
                          <Field
                            className="form-control"
                            type="datetime-local"
                            name="lessonD"
                            id="choose-date/time"
                            max={today}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-2">
                      <FieldArray name="formData">
                        {() => (
                          <div className={classNames(styles.list, 'col-lg-12')}>
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
                                        <p
                                          className={classNames(styles.link)}
                                          onClick={() => openStudentDetails(lessonVisit.studentId)}
                                        >
                                          { lessonVisit.studentName }
                                        </p>
                                      </td>
                                      <td>
                                        <Field
                                          name={`formData[${index}].studentMark`}
                                          type="number"
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
                  </Form>
                )}
              </Formik>
            </div>
          </WithLoading>
        </div>
        <div className={classNames(styles.placement, 'col-12')}>
          <button form="form" type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>Cancel</button>
          <button form="form" type="submit" className="btn btn-success btn-lg">Save</button>
        </div>
      </div>
    </div>
  );
};
