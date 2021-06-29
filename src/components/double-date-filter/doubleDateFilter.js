import React from 'react';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';
import propTypes from 'prop-types';

import { commonHelpers } from "@/utils";
import { Button } from '@components/index.js';

export const DoubleDateFilter = (props) => {
  const { rawItemsList, setFilteredItemsList, setCurrentPage, component } = props;
  let initialStartDate = `${new Date().getFullYear()}-01-01`;
  let initialFinishDate = `${commonHelpers.transformDateTime({}).reverseDate}`;
  let rawList;

  switch(component){
    case 'lessons': {
      rawList = rawItemsList.map(item => {
        const lessonDate = commonHelpers.transformDateTime({dateTime: item.lessonDate}).formInitialValue;
        return item = {...item, 
          startDate: lessonDate, 
          finishDate: lessonDate};
      });
      const d = new Date();
      d.setDate(d.getDate() - 15);
      initialStartDate = `${commonHelpers.transformDateTime({dateTime:d}).reverseDate}`;
      break;
    }
    default: {
      rawList = rawItemsList;
      break;
    }
  }


  const validate = ({ startDate, finishDate }) => startDate > finishDate && {startDate: ' ', finishDate: ' '};

  const filterByDate = ({ startDate, finishDate }) => {
    const newArray = rawList
      .filter((item) => {
        return (new Date(item.startDate.slice(0, 10)) >= new Date(startDate)) 
        && (new Date(item.finishDate.slice(0, 10)) <= new Date(finishDate))
      }
    );

    setFilteredItemsList(newArray);
    setCurrentPage(1);
  };

  return (
    <Formik
      initialValues={{
        startDate: initialStartDate,
        finishDate: initialFinishDate,
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
              />
            </div>
            <div className="col-5">
              <Field
                className={classNames('form-control', { 'border-danger': errors.finishDate })}
                type="date"
                name="finishDate"
                id="finishDate"
              />
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
  setCurrentPage: propTypes.func.isRequired,
  component: propTypes.string
};
