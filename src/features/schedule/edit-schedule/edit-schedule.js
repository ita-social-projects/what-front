import React, {useState, useEffect, useCallback} from "react";
// import { useHistory } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams} from 'react-router-dom';


import { paths, useActions } from "@/shared";
import { addAlert } from "@/features";
import { fetchSchedules, schedulesSelector ,editSchedule, editedScheduleSelector, deleteSchedule, deletedScheduleSelector, loadStudentGroupById, loadStudentGroupByIdSelector } from "@/models";

import { WithLoading } from "@/components";
import { Formik, Field, Form } from "formik";
import classNames from "classnames";
import styles from './edit-schedule.scss';
import { commonHelpers } from "@/utils";

export const EditSchedule = () => {
    const history = useHistory();
    const { id } = useParams();
    const [toShowModal, setToShowModal] = useState(false);

    const {
        data: schedules,
        isLoading: isScheduleLoading,
        isLoaded: isScheduleLoaded,
        error: scheduleError,
    } = useSelector(schedulesSelector, shallowEqual);

    const {
        data: group,
        isLoading: isGroupLoading,
        isLoaded: isGroupLoaded,
        error: groupError,
    } = useSelector(loadStudentGroupByIdSelector, shallowEqual);

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

    const [loadSchedules,updateSchedule, dispatchAddAlert, removeSchedule, getGroup] = useActions([fetchSchedules,editSchedule, addAlert, deleteSchedule, loadStudentGroupById]);

    

    useEffect(() => {
        loadSchedules();
    }, [])

    useEffect(() => {
        if(isScheduleLoaded && isGroupLoaded) {
            const schedule = schedules.find((schedule) => schedule.id === id );
            if(schedule !== undefined){
                getGroup(schedule.studentGroupId);
            }else{
                history.push(paths.NOT_FOUND);
            }
        }
    }, [isScheduleLoaded, isGroupLoaded, history]);

    useEffect(() =>{
        if (!editingError && isEditedLoaded && !isEditedLoading) {
            history.push(paths.SCHEDULE);
            dispatchAddAlert('The schedule has been successfully edited', 'success')
        }
        if (editingError && !isEditedLoaded && !isEditedLoading) {
            dispatchAddAlert(editingError);
        }
    }, [dispatchAddAlert, history, editingError, isEditedLoading, isGroupLoaded]);

    useEffect(() => {
        if (!isDeletedError && isDeletedLoaded && !isDeletedLoading) {
            history.push(paths.SCHEDULE);
            dispatchAddAlert('The schedule has been successfully deleted', 'success')
        }
        if (isDeletedError && !isDeletedLoaded && !isDeletedLoading) {
            dispatchAddAlert(isDeletedError);
        }
    }, [isDeletedError, isDeletedLoaded, history]);

    const handleCancel = useCallback(() => {
        history.push(paths.SCHEDULE);
    }, [history]);

    const onSubmit = (values) => {
        updateSchedule(values, id)
    }

    const handleShowModal = () => setToShowModal(true);
    const handleCloseModal = () => setToShowModal(false);

    const handleDelete = () => {
        handleCloseModal();
        removeSchedule(id);
    };

    return(
        <div className="container" data-testid='editScheduleRenderForm'>
            <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
                <div className="d-flex flex-row">
                    {groupError && scheduleError && editingError && isDeletedError && (
                        <div className="col-12 alert-danger">
                            Server Problems
                        </div>
                    )}
                  <div className="col-12">
                      <h3>Edit Schedule</h3>
                      <hr/>
                      <WithLoading
                      isLoading={
                          isScheduleLoading
                          || isGroupLoading
                          || !schedules
                      }
                      className={classNames(styles['loader-centered'])}
                      >
                          <Formik
                          data-testid='formik'
                          initialValues={{
                              groupeName: group.name,
                              eventStart: commonHelpers.transformDateTime({dateTime: schedules.eventStart}).formInitialValue,
                          }}
                          onSubmit = {onSubmit}
                          >
                              //
                              {/* {({ errors, isValid, dirty, handleReset }) => (
                  <Form id="form" className={classNames(styles.size)} data-testid='editForm'>
                    <div className="row mb-3">
                      <div className="col d-flex align-items-center">
                        <label className="mb-0 font-weight-bolder" htmlFor="name">Course name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          className={classNames('form-control', { 'border-danger': errors.name })}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Course name"
                        />
                      </div>
                      {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
                    </div>
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4 pl-0">
                        <Button
                          disabled={!isValid || dirty || isDeletedLoading}
                          className={classNames('w-100', styles['remove-button'])}
                          onClick={handleShowModal}
                        >Delete
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <Button
                          type="reset"
                          disabled={!isValid || !dirty || isEditedLoading || errors.name}
                          className={classNames('w-100', styles['clear-button'])}
                          onClick={handleReset}
                        >Clear
                        </Button>
                      </div>
                      <div className="col-md-3 col-4 pr-0">
                        <Button
                          type="submit"
                          disabled={!isValid || !dirty || isEditedLoading || errors.name}
                          className="btn w-100"
                        >Save
                        </Button>
                      </div>
                    </div>
                  </Form>
                )} */}
                              //
                          </Formik>
                      </WithLoading>
                  </div>
                </div>
            </div>
        </div>
    )

}