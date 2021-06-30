
import {commonHelpers} from "@/utils";
import Icon from "@/icon";
import styles from "./blocks.scss";
import React from "react";


/**
 *
 * @param props and custom
 * props contains:
 * data: array,
 * handleDetails: func,
 * handleEdit: func,
 * access: boolean (true by default),
 * fieldsToShow: Array<str>
 * custom: custom field
 * @returns jsx in block view
 */

export const Blocks = (
  { data, handleDetails, handleEdit, access = true, fieldsToShow },
  custom
) =>
  data.map(
    ({
      id,
      index,
      firstName,
      lastName,
      email,
      name,
      themeName,
      lessonShortDate,
      lessonTime,
      studentIds,
      startDate,
      finishDate,
    }) => (
      <div
        className="card"
        style={{
          width: '31%',
          margin: '1%',
          cursor: 'pointer',
        }}
        onClick={handleDetails ? () => handleDetails(id) : null}
        key={id}
      >
        <div className="card-body d-flex justify-content-between">
          {fieldsToShow.includes('index') && index && <div>{index + 1}</div>}
          <div>
            {fieldsToShow.includes('firstName') && firstName && (
              <div>{firstName}</div>
            )}
            {fieldsToShow.includes('name') && name && <div>{name}</div>}
            {fieldsToShow.includes('studentIds') && studentIds && (
              <div>Quantity of students: {studentIds.length}</div>
            )}
            {fieldsToShow.includes('startDate') && startDate && (
              <div>
                Start:{' '}
                {
                  commonHelpers.transformDateTime({
                    isDayTime: false,
                    dateTime: startDate,
                  }).date
                }
              </div>
            )}
            {fieldsToShow.includes('finishDate') && finishDate && (
              <div>
                Finish:{' '}
                {
                  commonHelpers.transformDateTime({
                    isDayTime: false,
                    dateTime: finishDate,
                  }).date
                }
              </div>
            )}
            {fieldsToShow.includes('themeName') && themeName && (
              <div>{themeName}</div>
            )}
            {fieldsToShow.includes('lessonShortDate') && lessonShortDate && (
              <div>{lessonShortDate}</div>
            )}
            {fieldsToShow.includes('lessonTime') && lessonTime && (
              <div>{lessonTime}</div>
            )}
            {fieldsToShow.includes('lastName') && lastName && (
              <div>{lastName}</div>
            )}
            {fieldsToShow.includes('email') && email && <div>{email}</div>}
            {fieldsToShow.includes('custom') && custom && <div>{custom}</div>}
          </div>
          {fieldsToShow.includes('edit') && access && (
            <Icon
              icon="Edit"
              onClick={handleEdit ? (event) => handleEdit(event, id) : null}
              className={styles.scale}
              color="#2E3440"
              size={30}
            />
          )}
        </div>
      </div>
    )
  );
