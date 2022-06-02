import React, { useEffect } from 'react';

import { WithLoading } from '@/components/index.js';
import { number } from 'prop-types';
import classNames from 'classnames';
import { commonHelpers } from "@/utils";
import { attachmentByIdSelector, fetchAttachmentById, getHomework, homeworkSelector } from '@/models';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useActions } from '@/shared';

export const HomeworkDetails = ({ id }) => {

  const history = useHistory();

  const { data, isLoading, loaded } = useSelector(homeworkSelector, shallowEqual);
  const {
    data: dataAttachment,
    isLoading: isLoadingAttachment,
    isLoaded: isLoadedAttachment,
  } = useSelector(attachmentByIdSelector, shallowEqual);
  
  const [
    getHomeworks,
  ] = useActions([getHomework]);

  const [
    getAttachment,
  ] = useActions([fetchAttachmentById]);

  useEffect(() => {
    if (!data && loaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [data, loaded, history]);

  useEffect(() => {
    getHomeworks(id);
  }, [getHomeworks, id]);

  useEffect(() => {
    getAttachment(1);
  }, [getAttachment]);

  const changeText = (text) => {
    if(loaded) {
      return text.split('<br>');
    }
  }

  const arr = new File([dataAttachment], "hello")

  console.log(dataAttachment);
  console.log(data);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames('col-sm-12 card shadow')}>
          <div className="px-2 py-4">
            <h3>Homework Details</h3>
            <div className="col-3 offset-1 text-right" />
            <hr />
            <WithLoading
              isLoading={isLoading || !loaded}
              className="d-block mx-auto m-0"
            >
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Lesson:</span>
                <span className="col-12 col-md-6">{data?.lessonId}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Task:</span>
                <span className="col-12 col-md-6 ">{changeText(data?.taskText)?.map((item) => <p key={item.length}>{item}</p>)}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Deadline date:</span>
                <span className="col-12 col-md-6">{commonHelpers.transformDateTime({ dateTime: data?.dueDate }).date}</span>
              </div>
              <hr />
              <div className="row">
                <span className="col-12 col-md-6 font-weight-bolder">Deadline time</span>
                <span className="col-12 col-md-6">{commonHelpers.transformDateTime({ dateTime: data?.dueDate }).time}</span>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6 font-weight-bolder"><span>Attachment('s): </span></div>
                <a className="col-12 col-md-6 d-flex flex-wrap lead" href={dataAttachment} download="file"> ffff</a>
              </div>
              <hr />
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeworkDetails.propTypes = {
  id: number.isRequired,
};
