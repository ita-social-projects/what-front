import React from 'react';

import { WithLoading, Button } from '@/components/index.js';
import styles from "./edit-homework.scss"

import classNames from 'classnames';

export const HomeworkEdit = () => {
  const homework = {
    dueDate: '2020-09-15T00:00:00',
    taskText: '1. Please create new HTML page <br>2. Page should contain 2 tables 2x2 in center',
    lessonId: 7,
    attachmentIds: [
      3,
      12,
    ],
  };

  const transformDateTime = (dateTime) => {
    const arr = dateTime.toString().split('T');
    return {
      date: arr[0],
      time: arr[1],
    };
  };

  const changeText = (text) => text.replace(/<br>/, '\n');

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames('col-sm-12 card shadow')}>
          <div className="px-2 py-4">
            <h3>Homework Details</h3>
            <div className="col-3 offset-1 text-right"></div>
            <hr />
            <WithLoading
              isLoading={false}
              className="d-block mx-auto m-0"
            >
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Lesson:</span>
                <span className="col-12 col-md-6">
                  <input type="text" className="form-control" value={homework?.lessonId} placeholder="Lesson them" />
                </span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Task:</span>
                <span className="col-12 col-md-6 ">
                  <textarea rows="7" className="form-control" >{changeText(homework?.taskText)}</textarea>
                </span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Deadline:</span>
                <span className="col-12 col-md-6">
                  <input type="date" className="form-control" />
                </span>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Attachment('s): </span></div>
                <div className="col-12 col-md-6 d-flex flex-wrap lead">
                <input type="file" id="actual-btn" name="themes" accept=".xlsx" className="form-control" />
                </div>
              </div>
              <hr />
              <div className="row justify-content-around mt-4">
                <Button type="reset" variant="secondary w-25">
                  Clear
                </Button>
                <Button type="submit" className="btn btn-secondary w-25">
                  Confirm
                </Button>
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
