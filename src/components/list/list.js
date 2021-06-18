import React from 'react';
import styles from './list.scss';
import Icon from '../../icon.js';

//todo add sort

const getRows = ({data, handleDetails, handleEdit, access = true, fieldsToShow}) =>
    data.map(({id, index, firstName, lastName, email, name, themeName, lessonShortDate, lessonTime}) =>
        <tr key={id}
            onClick={() => handleDetails(id)}
            className={styles['table-row']}
        >
            {fieldsToShow.includes('index') && index && <td className="text-center">{index + 1}</td>}
            {fieldsToShow.includes('firstName') && firstName && <td>{firstName}</td>}
            {fieldsToShow.includes('name') && name && <td>{name}</td>}
            {fieldsToShow.includes('themeName') && themeName && <td>{themeName}</td>}
            {fieldsToShow.includes('lessonShortDate') && lessonShortDate && <td>{lessonShortDate}</td>}
            {fieldsToShow.includes('lessonTime') && lessonTime && <td>{lessonTime}</td>}
            {fieldsToShow.includes('lastName') && lastName && <td>{lastName}</td>}
            {fieldsToShow.includes('email') && email && <td>{email}</td>}
            { fieldsToShow.includes('edit') && access ?
                (<td className="text-center"
                    onClick={(event) => handleEdit(event, id)}>
                    <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30}/>
                </td>) :
                <td></td>}
        </tr>
    );

const getBlocks = ({data, handleDetails, handleEdit, access = true, fieldsToShow}) =>
    data.map(({id, index, firstName, lastName, email, name, themeName, lessonShortDate, lessonTime}) =>
        <div className="card"
             style={{
                 width: '31%',
                 margin: '1%',
                 cursor: 'pointer'
             }}
             onClick={() => handleDetails(id)}
             key={id}>
            <div className="card-body d-flex justify-content-between">
                {fieldsToShow.includes('index') && index && <div>{index + 1}</div>}
                <div>
                    {fieldsToShow.includes('firstName') && firstName && <div>{firstName}</div>}
                    {fieldsToShow.includes('name') && name && <div>{name}</div>}
                    {fieldsToShow.includes('themeName') && themeName && <div>{themeName}</div>}
                    {fieldsToShow.includes('lessonShortDate') && lessonShortDate && <div>{lessonShortDate}</div>}
                    {fieldsToShow.includes('lessonTime') && lessonTime && <div>{lessonTime}</div>}
                    {fieldsToShow.includes('lastName') && lastName && <div>{lastName}</div>}
                    {fieldsToShow.includes('email') && email && <div>{email}</div>}
                </div>
                {fieldsToShow.includes('edit') && access
                && <Icon icon="Edit"
                         onClick={(event) => handleEdit(event, id)}
                         className={styles.scale}
                         color="#2E3440"
                         size={30}/>
                }

            </div>
        </div>
    );

const getErrorMessage = (errors) => {
    const returnError = {isError: false, message: ''};

    errors.forEach(error => {
        if (error.check.includes(true)) {
            returnError.isError = true;
            returnError.message = error.message;
        }
    });

    if (returnError.isError) {
        return <tr>
            <td colSpan="5" className="text-center">{returnError.message}</td>
        </tr>;
    }
}

/**
 * @param listType may be 'list' or 'block'
 * @param props is an object:
 * {
    data: Array<Object{id?, index?, firstName?, lastName?, email?, name?}>,
    handleDetails: function,
    handleEdit: function,
    errors: Array<Object{message, check: [boolean, ...]}>,
    access: boolean,
    fieldsToShow: Array<string>
  }
 * @returns jsx in rows (listType === 'list') or in blocks/cards (listType === 'block') or error message
 *
 * errors contains objects with check array (boolean values) and message field when at least one error is true
 * editRestriction contains boolean if user has role with limitation for editing, it is false by default
 */

export const List = ({listType, props}) => {
    const errorsMessage = getErrorMessage(props.errors);

    return errorsMessage ? errorsMessage
        : (listType === 'list') ? getRows(props)
        : getBlocks(props);
};