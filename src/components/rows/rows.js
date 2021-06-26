import styles from "./rows.scss";
import {commonHelpers} from "@/utils";
import Icon from "@/icon";
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

export const Rows = ({data, handleDetails, handleEdit, access = true, fieldsToShow}, custom) =>
    data.map(({
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
                  finishDate
              }) =>
        {
            return <tr key={id}
                       onClick={handleDetails? () => handleDetails(id): null}
                       className={styles['table-row']}
            >
                {fieldsToShow.includes('index') && index && <td className="text-center">{index + 1}</td>}
                {fieldsToShow.includes('firstName') && firstName && <td>{firstName}</td>}
                {fieldsToShow.includes('name') && name && <td>{name}</td>}
                {fieldsToShow.includes('studentIds') && studentIds && <td>{studentIds.length}</td>}
                {fieldsToShow.includes('startDate') && startDate &&
                <td>{commonHelpers.transformDateTime({isDayTime: false, dateTime: startDate}).date}
                </td>
                }
                {fieldsToShow.includes('finishDate') && finishDate &&
                <td>{commonHelpers.transformDateTime({isDayTime: false, dateTime: finishDate}).date}
                </td>
                }
                {fieldsToShow.includes('themeName') && themeName && <td>{themeName}</td>}
                {fieldsToShow.includes('lessonShortDate') && lessonShortDate && <td>{lessonShortDate}</td>}
                {fieldsToShow.includes('lessonTime') && lessonTime && <td>{lessonTime}</td>}
                {fieldsToShow.includes('lastName') && lastName && <td>{lastName}</td>}
                {fieldsToShow.includes('email') && email && <td>{email}</td>}
                {fieldsToShow.includes('edit') && access &&
                (<td className="text-center"
                     onClick={handleEdit ? (event) => handleEdit(event, id) : null}>
                    <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30}/>
                </td>)}
                {fieldsToShow.includes('custom') && custom && <td>{custom}</td>}
            </tr>}
    );