import React from 'react';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';
import propTypes from 'prop-types';

import { commonHelpers } from "@/utils";
import { Button } from '@components/index.js';

export const DoubleDateFilter = (props) => {
  const { rawItemsList, setFilteredItemsList, setCurrentPage } = props;

  const initialStartDate = () => `${new Date().getFullYear()}-01-01`;
  const initialFinishDate = () => `${commonHelpers.transformDateTime({}).reverseDate}`;

  const validate = ({ startDate, finishDate }) => startDate > finishDate && {startDate: ' ', finishDate: ' '};

  const filterByDate = ({ startDate, finishDate }) => {
    const newArray = rawItemsList
      .filter((group) => {
        return (new Date(group.startDate.slice(0, 10)) >= new Date(startDate)) 
        && (new Date(group.finishDate.slice(0, 10)) <= new Date(finishDate))
      }
    );

    setFilteredItemsList(newArray);
    setCurrentPage(1);
  };

  return (
    <Formik
      initialValues={{
        startDate: initialStartDate(),
        finishDate: initialFinishDate(),
      }}
      validate={validate}
      onSubmit={filterByDate}
      >
      {({ errors }) => (
        <Form name="start-group" className="row d-flex">
            <div className="col-5">
              <Field
                className={classNames('form-control', { 'border-danger': errors.startDate })}
                type="date"
                name="startDate"
                id="startDate"
                required
              />
              {errors.startDate && <p className="text-danger mb-0">{errors.startDate}</p>}
            </div>
            <div className="col-5">
              <Field
                className={classNames('form-control', { 'border-danger': errors.finishDate })}
                type="date"
                name="finishDate"
                id="finishDate"
                required
              />
              {errors.finishDate && <p className="text-danger mb-0">{errors.finishDate}</p>}
          </div>
          <div className="col-2 text-right">
            <Button type="submit">
              Filter
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

DoubleDateFilter.propTypes = {
  rawItemsList: propTypes.array.isRequired,
  setFilteredItemsList: propTypes.func.isRequired,
  setCurrentPage: propTypes.func.isRequired
};
