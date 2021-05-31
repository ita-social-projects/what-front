import React, { useEffect } from 'react';

import { WithLoading } from '@/components/index.js';

import classNames from 'classnames';

export const HomeworkDetails = () => {
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

  const changeText = (text) => text.split('<br>');

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
                <span className="col-12 col-md-6">{homework?.lessonId}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Task:</span>
                <span className="col-12 col-md-6 ">{changeText(homework?.taskText).map((item) => <p key={item.length}>{item}</p>)}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Deadline date:</span>
                <span className="col-12 col-md-6">{transformDateTime(homework?.dueDate).date}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Deadline time</span>
                <span className="col-12 col-md-6">{transformDateTime(homework?.dueDate).time}</span>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Attachment('s): </span></div>
                <div className="col-12 col-md-6 d-flex flex-wrap lead"></div>
              </div>
              <hr />
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
