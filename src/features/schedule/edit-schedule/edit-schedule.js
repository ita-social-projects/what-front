import React, { useState, useEffect, useCallback, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { paths, useActions } from "@/shared";
import { editedScheduleSelector, deletedScheduleSelector, editSchedule, deleteSchedule } from "@/models";

import { WithLoading, Button } from "@/components";
import { editScheduleValidation } from "@/features/validation/validation-helpers";
import { addAlert, ModalWindow } from "@/features";
import { Formik, Field, Form } from "formik";
import { helpersData } from "./helpers-data";

import classNames from "classnames";
import styles from "./edit-schedule.scss";
import { commonHelpers } from "@/utils";

export const EditSchedule = ({id, schedulesData, groupData, themesData, mentorsData}) => {
  const history = useHistory();
  const [ updateSchedule, dispatchAddAlert, removeSchedule ] = useActions([ editSchedule, addAlert, deleteSchedule ]);

  const {
    data: schedules,
    isLoading: isScheduleLoading,
    isLoaded: isScheduleLoaded,
    error: scheduleError,
  } = schedulesData

  const {
    data: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
    error: groupError,
  } = groupData

  const {
    data: themes,
    isLoading: isThemesLoading,
    isLoaded: isThemesLoaded,
    error: themesError,
  } = themesData

  const {
    data: mentors,
    isLoading: isMentorsLoading,
    isLoaded: isMentorsLoaded,
    error: mentorsError,
  } = mentorsData

  const {
    isLoading: isEditedLoading,
    isLoaded: isEditedLoaded,
    error: editingError,
  } = useSelector(editedScheduleSelector, shallowEqual);

  const {
    isLoading: isDeletedLoading,
    isLoaded: isDeletedLoaded,
    error: isDeletedError,
  } = useSelector(deletedScheduleSelector, shallowEqual);

    const {typeRepeatingAppointments, daysOfWeek, indexWeekDay} = helpersData;

    const [weekDays, setWeekDays] = useState([]);
    const [dayInputError, setDayInputError] = useState("");
    const [interval, setInterval] = useState(1);
    const [toShowModal, setToShowModal] = useState(false);
    const [filteredThemes, setFilteredThemes] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
  
    const handleShowModal = () => setToShowModal(true);
    const handleCloseModal = () => setToShowModal(false);
    

  useEffect(() => {
    if (!schedules && !group && isScheduleLoaded && isGroupLoaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [schedules, isScheduleLoaded, isGroupLoaded, history]);

  useEffect(() => {
    if (!editingError && isEditedLoaded && !isEditedLoading) {
      history.push(paths.SCHEDULE);
      dispatchAddAlert("The schedule has been successfully edited", "success");
    }
    if (editingError && !isEditedLoaded && !isEditedLoading) {
      dispatchAddAlert(editingError);
    }
  }, [dispatchAddAlert, history, editingError, isEditedLoading]);

  useEffect(() => {
    if (!isDeletedError && isDeletedLoaded && !isDeletedLoading) {
      history.push(paths.SCHEDULE);
      dispatchAddAlert("The schedule has been successfully deleted", "success");
    }
    if (isDeletedError && !isDeletedLoaded && !isDeletedLoading) {
      dispatchAddAlert(isDeletedError);
    }
  }, [isDeletedError, isDeletedLoaded, history]);

  const filterThemesByEventsId = (themesData, schedulesEvents) => {
    let result = [];
    if(themesData && schedulesEvents){
       result = themesData.filter(theme => {
          return schedulesEvents.find(event => event.themeId === theme.id);
       });
    }
    return result;
  };

  useEffect(() => {
    if(schedules && group && schedules.events && group.mentorIds){
      setFilteredThemes(filterThemesByEventsId(themes, schedules.events));
      setFilteredMentors(mentors.filter(({id}) => group.mentorIds.includes(id)));
    }
  }, [themes, schedules, group, mentors]);


  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevWeekDays = usePrevious(weekDays);

  const addDayOfWeek = (dayNames, clearField) => {
    const day = daysOfWeek.find(({ name }) => name === dayNames);
    if (day) {
      clearField();
      setDayInputError("");
      setWeekDays((prevState) => [...prevState, day]);
    } else {
      setDayInputError("Day of week not found");
    }
  };

  const removeDayOfWeek = useCallback(
    (weekDayId) => {
      setWeekDays(weekDays.filter(({ id }) => id !== weekDayId));
    },
    [weekDays]
  );

  const onSubmit = ({
    eventStart,
    eventFinish,
    typeRepeating,
    index,
    themeId,
    mentorId,
  }) => {
    const editingScheduleData = {
      pattern: {
        type: Number(typeRepeating),
        interval: Number(interval),
        daysOfWeek: [...new Set(weekDays.map(({ id }) => id))],
        index: index !== undefined ? Number(index) : 1,
        dates: null,
      },
      range: {
        startDate: eventStart,
        finishDate: eventFinish,
      },
      context: {
        groupID: group.id,
        themeID: themeId !== undefined ? Number(themeId) : filteredThemes[0].id,
        mentorID: mentorId !== undefined ? Number(mentorId) : filteredMentors[0].id
      },
    };
    console.log(editingScheduleData);
    // updateSchedule(editingScheduleData, id)
  };

  // const handleCancel = useCallback(() => {
  //   history.push(paths.SCHEDULE);
  // }, [history]);

  const handleReset = () => {
    setInterval(1);
    setWeekDays([]);
  }

  const handleDelete = () => {
    handleCloseModal();
    removeSchedule(id);
  };

  return (
    <div className="container " data-testid="editScheduleRenderForm">
        <div className={classNames(styles.page)}>
          {groupError && scheduleError && themesError && mentorsError && editingError && isDeletedError && (
            <div className="col-12 alert-danger">Server Problems</div>
          )}
          <div className="px-2 py-4">
            <h3>Edit Schedule</h3>
            <hr />
            <WithLoading
              isLoading={isScheduleLoading || isGroupLoading || !schedules}
              className={classNames(styles["loader-centered"])}
            >
              <Formik
                data-testid="formik"
                initialValues={{
                  groupName: group?.name,
                  themeId: filteredThemes.id,
                  mentorId: filteredMentors.id,
                  eventStart: commonHelpers.transformDateTime({
                    dateTime: schedules?.eventStart,
                    }).formInitialValue,
                  eventFinish: commonHelpers.transformDateTime({
                    dateTime: schedules?.eventFinish,
                    }).formInitialValue,
                  typeRepeating: schedules?.pattern,
                  interval,
                  weekDay: weekDays, 
                  index: indexWeekDay.id
                }}
                onSubmit={onSubmit}
                validationSchema={editScheduleValidation}
              >
                {({ values, errors, setFieldValue, isValid, dirty }) => (
                  <Form
                    id="form"
                    className={classNames(styles.size)}
                    className='px-2'
                    data-testid="editForm"
                    >
                      
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="groupName">
                            Group Name:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              data-testid="groupName"
                              type="text"
                              name="groupName"
                              className={classNames('form-control', { 'border-danger': errors.groupName })}
                              value={group?.name}
                              disabled
                            />
                            {errors.groupName && <p className="w-100 text-danger mb-0">{errors.groupName}</p>}
                          </div>
                    </div>
                   <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="themeId">
                              Theme:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              id="themeId"
                              as="select"
                              className={classNames("custom-select")}
                              name="themeId"
                            >
                              {filteredThemes
                                .map((theme) => (
                                  <option value={theme.id} key={theme.id}>
                                    {theme.name}
                                  </option>
                                ))}
                            </Field>
                          </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="mentorId">
                              Mentor:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              id="mentorId"
                              as="select"
                              className={classNames("custom-select")}
                              name="mentorId"
                            >
                              {filteredMentors
                                .map((mentor) => (
                                  <option value={mentor.id} key={mentor.id}>
                                    {mentor.firstName} {mentor.lastName}
                                  </option>
                                ))}
                            </Field>
                          </div>
                    </div> 
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="eventStart">
                            Start Date/Time:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              data-testid="eventStart"
                              className={classNames('form-control', { 'border-danger': errors.eventStart })}
                              type="datetime-local"
                              name="eventStart"
                              id="eventStart"
                              max={values.eventFinish}
                              required
                            />
                            {errors.eventStart && <p className="text-danger mb-0">{errors.eventStart}</p>}
                          </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="choose-date/time">
                            Finish Date/Time:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              data-testid="eventFinish"
                              className={classNames('form-control', { 'border-danger': errors.eventFinish })}
                              type="datetime-local"
                              name="eventFinish"
                              id="eventFinish"
                              required
                            />
                            {errors.eventFinish && <p className="text-danger mb-0">{errors.eventFinish}</p>}
                          </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="typeRepeating">
                            Periodicity:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              id="typeRepeating"
                              as="select"
                              className={classNames("custom-select")}
                              name="typeRepeating"
                            >
                              <option
                                value={schedules?.pattern}
                                key={schedules?.pattern}
                              >
                                { typeRepeatingAppointments.find(
                                    (type) => type.id === schedules.pattern
                                  )?.name }
                              </option>
                                {typeRepeatingAppointments
                                  .filter((type) => type.id !== schedules.pattern)
                                  .map((type) => (
                                  <option value={type.id} key={type.id}>
                                    {type.name}
                                  </option>
                                ))}
                            </Field>
                          </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <label className="mt-2 font-weight-bolder" htmlFor="inputInterval">
                            Interval:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              data-testid="interval"
                              type="number"
                              name="interval"
                              className="form-control"
                              value={interval}
                              onChange={(e) => setInterval(e.target.value)}
                              min="1"
                              max={
                                values.typeRepeating === "0"
                                  ? "360"
                                  : values.typeRepeating === "1"
                                  ? "48"
                                  : "12"
                              }
                            />
                          </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-start">
                          <label className="mt-2 font-weight-bolder" htmlFor="weekDay">
                            Day of Week:
                          </label>
                        </div>
                          <div className="col-sm-8">
                            <div className="d-flex" data-testid="weekDay">
                              <Field
                                className="form-control f"
                                type="text"
                                name="weekDay"
                                placeholder="Select day('s) of week"
                                list="weekDays-list"
                              />
                              <datalist id="weekDays-list">
                                {daysOfWeek.map(({ id, name }) => (
                                  <option key={id} value={name} />
                                ))}
                              </datalist>
                              <Button
                                id="add-weekDay-btn"
                                variant="info"
                                onClick={() => addDayOfWeek(values.weekDay,
                                         () => setFieldValue("weekDay", ""))}
                                disabled={!dirty}
                              >
                                +
                              </Button>
                            </div>
                            {dayInputError && (
                              <p className="text-danger mb-0">{dayInputError}</p>
                            )}
                            <div className="w-100">
                              <ul className="col-md-12 d-flex flex-wrap justify-content-between p-0">
                                {weekDays.map(({ id, name }) => (
                                  <li
                                    key={id}
                                    id="chosenWeekDay"
                                    className={classNames(
                                      "d-flex bg-light border border-outline-secondary rounded",
                                      styles['list-element']
                                    )}
                                  >
                                    {name}
                                    <button
                                      type="button"
                                      className={classNames(
                                        "btn p-0 ml-auto mr-2 font-weight-bold",
                                        styles.cross
                                      )}
                                      onClick={() => removeDayOfWeek(id)}
                                    >
                                      X
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                    </div>
                   {(values.typeRepeating === 3 || values.typeRepeating === "3") && (
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                            <label className="mb-0 font-weight-bolder" htmlFor="index">
                              Index:
                            </label>
                        </div>
                          <div className="col-sm-8">
                            <Field
                              id="indexWeek"
                              as="select"
                              className={classNames("custom-select")}
                              name="index"
                            >
                              {indexWeekDay.map((index) => (
                                <option value={index.id} key={index.id}>
                                  {index.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                    </div>
                    )}
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4 pl-0">
                        <Button
                          className={classNames(styles["exclude-btn"], "w-80")}
                          onClick={handleShowModal}
                          disabled={
                            !isValid ||
                            dirty ||
                            isEditedLoading ||
                            isDeletedLoading
                          }
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <Button
                          type="reset"
                          onClick={ handleReset }
                          className={ classNames(styles["clear-button"],"w-100" ) }
                          disabled={ !dirty || !isValid || (!dirty && prevWeekDays !== weekDays) || isScheduleLoading }
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="col-md-3 col-4 pr-0">
                        <Button
                          type="submit"
                          className="btn btn-secondary w-100 buttonConfirm"
                          disabled={
                            !isValid ||
                            !dirty ||
                            (!dirty && prevWeekDays !== weekDays) ||
                            isScheduleLoading ||
                            isEditedLoading ||
                            isDeletedLoading ||
                            errors.groupName ||
                            errors.eventStart ||
                            errors.eventFinish
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={handleDelete}
                onClose={handleCloseModal}
                submitButtonText="Delete"
                useRedButton
                marginLeft
              >
                Are you sure you want to exclude this schedule?
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
  );
};
