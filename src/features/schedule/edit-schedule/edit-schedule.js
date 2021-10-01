import React, { useState, useEffect, useCallback, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { paths, useActions } from "@/shared";
import { addAlert } from "@/features";
import {
  fetchSchedulesByGroupId,
  schedulesByGroupIdSelector,
  editSchedule,
  editedScheduleSelector,
  deleteSchedule,
  deletedScheduleSelector,
  loadStudentGroupById,
  loadStudentGroupByIdSelector,
} from "@/models";

import { WithLoading, Button } from "@/components";
import { Formik, Field, Form } from "formik";
import classNames from "classnames";
import styles from "./edit-schedule.scss";
import { commonHelpers } from "@/utils";

export const EditSchedule = () => {
  const history = useHistory();
  const { id } = useParams();
  const [toShowModal, setToShowModal] = useState(false);

  const [dispatchFetchScheduleById, dispatchFetchScheduleByGroup] = useActions([
    fetchSchedulesByGroupId,
    loadStudentGroupById,
  ]);

  const schedulesData = useSelector(schedulesByGroupIdSelector, shallowEqual);
  const groupData = useSelector(loadStudentGroupByIdSelector, shallowEqual);

  useEffect(() => {
    dispatchFetchScheduleById(id);
    dispatchFetchScheduleByGroup(id);
  }, [dispatchFetchScheduleByGroup, dispatchFetchScheduleById, id]);

  const {
    data: schedules,
    isLoading: isScheduleLoading,
    isLoaded: isScheduleLoaded,
    error: scheduleError,
  } = schedulesData;

  const {
    data: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
    error: groupError,
  } = groupData;

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

  const [updateSchedule, dispatchAddAlert, removeSchedule] = useActions([
    editSchedule,
    addAlert,
    deleteSchedule,
  ]);

  useEffect(() => {
    if (!schedules && isScheduleLoaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [schedules, isScheduleLoaded, history]);

  useEffect(() => {
    if (!editingError && isEditedLoaded && !isEditedLoading) {
      history.push(paths.SCHEDULE);
      dispatchAddAlert("The schedule has been successfully edited", "success");
    }
    if (editingError && !isEditedLoaded && !isEditedLoading) {
      dispatchAddAlert(editingError);
    }
  }, [dispatchAddAlert, history, editingError, isEditedLoading, isGroupLoaded]);

  useEffect(() => {
    if (!isDeletedError && isDeletedLoaded && !isDeletedLoading) {
      history.push(paths.SCHEDULE);
      dispatchAddAlert("The schedule has been successfully deleted", "success");
    }
    if (isDeletedError && !isDeletedLoaded && !isDeletedLoading) {
      dispatchAddAlert(isDeletedError);
    }
  }, [isDeletedError, isDeletedLoaded, history]);

  const typeRepeatingAppointments = [
    { id: 0, name: "Daily" },
    { id: 1, name: "Weekly" },
    { id: 2, name: "Absolute monthly" },
    { id: 3, name: "Relative monthly" },
  ];

  const daysOfWeek = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  const indexWeekDay = [
    { id: 1, name: "first" },
    { id: 2, name: "second" },
    { id: 3, name: "third" },
    { id: 4, name: "fourth" },
  ];
  // const interval

  const [weekDays, setWeekDays] = useState([]);
  const [dayInputError, setDayInputError] = useState("");
  const [interval, setInterval] = useState("1");

  const prevWeekDays = usePrevious(weekDays);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

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

  // const handleCancel = useCallback(() => {
  //     history.push(paths.SCHEDULE);
  // }, [history]);

  // const onSubmit = (values) => {
  //     updateSchedule(values, id)
  // }

  // const handleShowModal = () => setToShowModal(true);
  // const handleCloseModal = () => setToShowModal(false);

  // const handleDelete = () => {
  //     handleCloseModal();
  //     removeSchedule(id);
  // };

  return (
    <div className="container" data-testid="editScheduleRenderForm">
      <div className={classNames(styles.page, "mx-auto", "col-12")}>
        <div className="d-flex flex-row">
          {groupError && scheduleError && editingError && isDeletedError && (
            <div className="col-12 alert-danger">Server Problems</div>
          )}
          <div className="col-12">
            <h3>Edit Schedule</h3>
            <hr />
            <WithLoading
              isLoading={isScheduleLoading || isGroupLoading || !schedules}
              className={classNames(styles["loader-centered"])}
            >
              <Formik
                data-testid="formik"
                initialValues={{
                  groupeName: group.name,
                  eventStart: commonHelpers.transformDateTime({
                    dateTime: schedules.eventStart,
                  }).formInitialValue,
                  eventFinish: commonHelpers.transformDateTime({
                    dateTime: schedules.eventFinish,
                  }).formInitialValue,
                  typeRepeating: typeRepeatingAppointments.id,
                  weekDay: daysOfWeek.id,
                }}
                // onSubmit = {onSubmit}
                // validationSchema={editScheduleValidation}
              >
                {({ values, errors, setFieldValue, isValid, dirty }) => (
                  <Form
                    id="form"
                    className={classNames(styles.size)}
                    data-testid="editForm"
                  >
                    <div className="d-flex flex-sm-column flex-lg-row">
                      <div className="col-lg-6">
                        <div className="form-group row">
                          <label
                            htmlFor="inputGroupName"
                            className="col-sm-4 col-form-label"
                          >
                            Group Name:
                          </label>
                          <div className="col-sm-8 input-group">
                            <Field
                              data-testid="groupName"
                              type="text"
                              name="groupName"
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
                          >
                            Start Group Date/Time:
                          </label>
                          <div className="col-md-8">
                            <Field
                              data-testid="eventStart"
                              className="form-control"
                              type="datetime-local"
                              name="eventStart"
                              id="choose-date-start/time"
                              max={
                                commonHelpers.transformDateTime({})
                                  .formInitialValue
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-md-4 col-form-label"
                            htmlFor="choose-date/time"
                          >
                            Finish Group Date/Time:
                          </label>
                          <div className="col-md-8">
                            <Field
                              data-testid="eventFinish"
                              className="form-control"
                              type="datetime-local"
                              name="eventFinish"
                              id="choose-date-finish/time"
                              max={
                                commonHelpers.transformDateTime({})
                                  .formInitialValue
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col d-flex align-items-center">
                            <label className="mb-0" htmlFor="course">
                              Periodicity:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <Field
                              id="typeRepeat"
                              as="select"
                              className={classNames("custom-select")}
                              name="typeRepeating"
                            >
                              {typeRepeatingAppointments.map((type) => (
                                <option value={type.id} key={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="inputInterval"
                            className="col-sm-4 col-form-label"
                          >
                            Interval:
                          </label>
                          <div className="col-sm-8 input-group">
                            <Field
                              data-testid="groupName"
                              type="number"
                              name="interval"
                              className="form-control"
                              value={interval}
                              onChange={(e) => setInterval(e.target.value)}
                              min="1"
                              max={
                                values.typeRepeating === "1"
                                  ? "4"
                                  : values.typeRepeating === "2"
                                  ? "12"
                                  : values.typeRepeating === "3"
                                  ? "12"
                                  : "360"
                              }
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col d-flex align-items-start">
                            <label className="mt-2" htmlFor="mentor">
                              Day of Week:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <div
                              className="d-flex"
                              data-testid="mentor-field-wrapper"
                            >
                              <Field
                                className="form-control f"
                                type="text"
                                name="weekDay"
                                list="weekDays-list"
                              />
                              <datalist id="weekDays-list">
                                {daysOfWeek.map(({ id, name }) => (
                                  <option key={id} value={`${name}`} />
                                ))}
                              </datalist>
                              <Button
                                id="add-weekDay-btn"
                                variant="info"
                                onClick={() =>
                                  addDayOfWeek(values.weekDay, () =>
                                    setFieldValue("weekDay", "")
                                  )
                                }
                                disabled={!dirty}
                              >
                                +
                              </Button>
                            </div>
                            {dayInputError && (
                              <p className="text-danger mb-0">
                                {dayInputError}
                              </p>
                            )}
                            <div className="w-100">
                              <ul className="col-md-12 d-flex flex-wrap justify-content-between p-0">
                                {weekDays.map(({ id, name }) => (
                                  <li
                                    key={id}
                                    id="chosenWeekDay"
                                    className={classNames(
                                      "d-flex bg-light border border-outline-secondary rounded",
                                      styles["datalist-item"]
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
