import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { Button, WithLoading } from '@components/index.js';
import { addScheduleValidation } from '@features/validation/validation-helpers.js';
import { ModalWindow } from '@/features/index.js';
import { paths } from '@/shared/index.js';

import styles from './add-schedule.scss';

import { useFetching } from './add-schedule-useFetch.js';
import {
  intervalType,
  weekDays,
  eventInDayOfWeek,
  recurrencePatterns,
  initialVal,
} from './add-schedule-data.js';

export const AddSchedule = () => {
  const history = useHistory();

  const { daily, weekly, monthly } = intervalType;

  const {
    groups: {
      data: allGroups,
      isLoading: areGroupsLoading,
      isLoaded: areGroupsLoaded,
      error: allGroupsError,
    },
    mentors: {
      data: allActiveMentors,
      isLoading: areActiveMentorsLoading,
      isLoaded: areActiveMentorsLoaded,
      error: allActiveMentorsError,
    },
    themes: {
      data: allThemes,
      isLoading: areThemesLoading,
      isLoaded: areThemesLoaded,
      error: allThemesError,
    },
    addSchedule,
  } = useFetching();

  const [postInfo, setPostInfo] = useState({});

  const prepareToSubmit = (values) => {
    const {
      patternType,
      interval,
      daysOfWeek,
      index,
      dates,
      startDate,
      finishDate,
      group,
      theme,
      mentor,
    } = values;

    const daysOfWeekForSend = daysOfWeek.map((el) => {
      if (el === 'Sunday') {
        return 0;
      }

      return weekDays.findIndex((item) => el === item) + 1;
    });

    const patternTypeforSend = recurrencePatterns.findIndex((item) => item === patternType);

    const groupID = allGroups.find(({ name }) => name === group).id;
    const themeID = allThemes.find(({ name }) => name === theme).id;
    const mentorID = allActiveMentors.find(({ firstName, lastName }) => `${firstName} ${lastName}` === mentor).id;

    const postData = {
      pattern: {
        type: patternTypeforSend,
        interval,
        daysOfWeek: daysOfWeekForSend,
        index,
        dates: [dates],
      },
      range: {
        startDate,
        finishDate,
      },
      context: {
        groupID,
        themeID,
        mentorID,
      },
    };

    return postData;
  };

  const onSubmit = (values) => {
    const postData = prepareToSubmit(values);

    if (!allGroupsError && !allActiveMentorsError && !allThemesError) {
      setPostInfo(postData);
    }
  };

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePost = () => {
    history.push(paths.SCHEDULE);
    addSchedule(postInfo);
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h2>Schedule Adding</h2>
            <hr />
            <WithLoading
              isLoading={
                (areGroupsLoading && !areGroupsLoaded)
                || (areActiveMentorsLoading && !areActiveMentorsLoaded)
                || (areThemesLoading && !areThemesLoaded)
              }
              className={styles['loader-centered']}
            >
              <div data-testid="add-schedule">
                <Formik
                  initialValues={initialVal}
                  validationSchema={addScheduleValidation}
                  onSubmit={onSubmit}
                >
                  {({ values, errors, isValid, handleChange, handleBlur }) => (
                    <Form>
                      {/* ##### RECURRENCE ##### */}
                      <label
                        htmlFor="patternType"
                        className="row m-0 pt-3 d-flex"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Recurrence pattern:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="patternType"
                            name="patternType"
                            data-testid="patternType"
                            className="w-100"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.patternType}
                          >
                            <option value="" label="Select a recurrence type" />
                            {recurrencePatterns.map((pattern) => (
                              <option key={pattern} value={pattern} label={pattern} />
                            ))}
                          </select>
                          {errors.patternType
                            && <div className={styles.error}>{errors.patternType}</div>}
                        </div>
                      </label>
                      {/* ##### INTERVAL ##### */}
                      <label
                        htmlFor="interval"
                        className="row m-0 pt-3 d-flex"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Interval between each occurrence:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="interval"
                            name="interval"
                            data-testid="interval"
                            className="w-100"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.interval}
                          >
                            <option value="" label="Select an interval" />
                            {values.patternType === recurrencePatterns[0]
                              && daily.map((pattern) => (
                                <option key={pattern} value={pattern} label={pattern} />
                              ))}
                            {(values.patternType === recurrencePatterns[1]
                              || values.patternType === recurrencePatterns[3])
                              && weekly.map((pattern) => (
                                <option key={pattern} value={pattern} label={pattern} />
                              ))}
                            {values.patternType === recurrencePatterns[2]
                              && monthly.map((pattern) => (
                                <option key={pattern} value={pattern} label={pattern} />
                              ))}
                          </select>
                          {errors.interval
                            && <div className={styles.error}>{errors.interval}</div>}
                        </div>
                      </label>
                      {/* ##### DAYS OF WEEK ##### */}
                      <label
                        htmlFor="dayOfWeek"
                        className="row m-0 pt-3 d-flex"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Days of week:
                        </p>
                        <div className="col-md-8">
                          {weekDays.map((day) => (
                            <span className="pr-3" key={day}>
                              <Field
                                type="checkbox"
                                name="daysOfWeek"
                                value={day}
                                className="mr-1"
                                disabled={
                                  !values.patternType
                                  || values.patternType === recurrencePatterns[0]
                                  || values.patternType === recurrencePatterns[2]
                                }
                              />
                              <span>{day}</span>
                            </span>
                          ))}
                          {errors.daysOfWeek
                            && <div className={styles.error}>{errors.daysOfWeek}</div>}
                        </div>
                      </label>
                      {/* ##### DAY OF MONTH ##### */}
                      <label
                        htmlFor="dates"
                        className="row m-0 pt-3 d-flex"
                        data-testid="dates"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Day of month:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="dates"
                            name="dates"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dates}
                            className="w-100"
                            disabled={values.patternType !== recurrencePatterns[2]}
                          >
                            <option value="" label="Select a day" />
                            {daily.map((num) => (
                              <option key={num} value={num} label={num} />
                            ))}
                          </select>
                          {errors.dates
                            && <div className={styles.error}>{errors.dates}</div>}
                        </div>
                      </label>
                      {/* ##### INDEX ##### */}
                      <label
                        htmlFor="index"
                        className="row m-0 pt-3 d-flex"
                        data-testid="index"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Instance of the allowed days the event occurs:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="index"
                            name="index"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.index}
                            className="w-100"
                            disabled={values.patternType !== recurrencePatterns[3]}
                          >
                            <option value="" label="Select in what days of week the event occurs" />
                            {eventInDayOfWeek.map((num) => (
                              <option key={num} value={num} label={num} />
                            ))}
                          </select>
                          {errors.index
                            && <div className={styles.error}>{errors.index}</div>}
                        </div>
                      </label>
                      {/* ##### START DATE ##### */}
                      <label
                        htmlFor="startDate"
                        className="row m-0 pt-3 d-flex"
                        data-testid="startDate"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Start date:
                        </p>
                        <div className="col-md-8">
                          <Field
                            className="w-100"
                            name="startDate"
                            id="startDate"
                            type="datetime-local"
                          />
                          {errors.startDate
                            && <div className={styles.error}>{errors.startDate}</div>}
                        </div>
                      </label>
                      {/* ##### END DATE ##### */}
                      <label
                        htmlFor="finishDate"
                        className="row m-0 pt-3 d-flex"
                        data-testid="finishDate"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          End date:
                        </p>
                        <div className="col-md-8">
                          <Field
                            className="w-100"
                            name="finishDate"
                            id="finishDate"
                            type="datetime-local"
                          />
                          {errors.finishDate
                            && <div className={styles.error}>{errors.finishDate}</div>}
                        </div>
                      </label>
                      {/* ##### GROUPS ##### */}
                      <label
                        htmlFor="group"
                        className="row m-0 pt-3 d-flex"
                        data-testid="group"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Groups:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="group"
                            name="group"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.group}
                            className="w-100"
                          >
                            <option value="" label="Select group" />
                            {allGroups.map(({ name, id }) => (
                              <option key={id} value={name} label={name} />
                            ))}
                          </select>
                          {(allGroupsError || errors.group)
                            && <div className={styles.error}>{allGroupsError || errors.group}</div>}
                        </div>
                      </label>
                      {/* ##### THEMES ##### */}
                      <label
                        htmlFor="theme"
                        className="row m-0 pt-3 d-flex"
                        data-testid="theme"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Themes:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="theme"
                            name="theme"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.theme}
                            className="w-100"
                          >
                            <option value="" label="Select theme" />
                            {allThemes.map(({ name, id }) => (
                              <option key={id} value={name} label={name} />
                            ))}
                          </select>
                          {(allThemesError || errors.theme)
                            && <div className={styles.error}>{allThemesError || errors.theme}</div>}
                        </div>
                      </label>
                      {/* ##### MENTORS ##### */}
                      <label
                        htmlFor="mentor"
                        className="row m-0 pt-3 d-flex"
                        data-testid="mentor"
                      >
                        <p className="col-md-4 font-weight-bolder">
                          Mentors:
                        </p>
                        <div className="col-md-8">
                          <select
                            id="mentor"
                            name="mentor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mentor}
                            className="w-100"
                          >
                            <option value="" label="Select mentor" />
                            {allActiveMentors.map(({ firstName, lastName, id }) => (
                              <option
                                key={id}
                                value={`${firstName} ${lastName}`}
                                label={`${firstName} ${lastName}`}
                              />
                            ))}
                          </select>
                          {(allActiveMentorsError || errors.mentor)
                            && (
                              <div className={styles.error}>
                                {allActiveMentorsError || errors.mentor}
                              </div>
                            )}
                        </div>
                      </label>

                      <div className="row m-0 pt-3">
                        <div className="col-md-3 col-4">
                          <Button
                            type="submit"
                            disabled={!isValid}
                            onClick={values.patternType ? handleShowModal : null}
                          >Add Schedule
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={handlePost}
                onClose={handleCloseModal}
                submitButtonText="Submit"
                marginLeft
              >Are you sure you want to add this schedule?
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};