import React from 'react';
import styles from './list.scss';
import Icon from '../../icon.js';

//todo fix style's classes, add cursor point for edit btn

const getRows = (data, handleDetails, handleEdit) =>
    data.map(({id, index, firstName, lastName, email} ) =>
        <tr key={id}
            onClick={() => handleDetails(id)}
            data-student-id={id}
            className={styles['table-row']}
        >
          <td className="text-center">{index + 1}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td className="text-center"
              onClick={(event) => handleEdit(event, id)}>
            <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30}/>
          </td>
        </tr>
);

const getBlocks = (data, handleDetails, handleEdit) =>
    data.map(({id, index, firstName, lastName, email}) =>
        <div className="card"
             style={{
               width: '31%',
               margin: '1%',
               cursor: 'pointer'
             }}
             onClick={() => handleDetails(id)}
             key={id}>
          <div className="card-body d-flex justify-content-between">
            <div>{index + 1}</div>
            <div>
              <div>
                {firstName}
              </div>
              <div>
                {lastName}
              </div>
              <div>
                {email}
              </div>
            </div>
            <Icon icon="Edit"
                  onClick={(event) => handleEdit(event, id)}
                  className={styles.scale}
                  color="#2E3440"
                  size={30}/>
          </div>
        </div>
);

export const List = ({listType, props}) => {
const { data, handleDetails, handleEdit, errors } = props;

  const markup = (listType === 'list')
      ? getRows(data, handleDetails, handleEdit)
      : getBlocks(data, handleDetails, handleEdit);

  const returnError = {isError: false, message: ''};

  errors.forEach(error => {
    if(error.check.includes(true)){
      returnError.isError = true;
      returnError.message = error.message;
    }
  });

  if (returnError.isError) {
    return <tr><td colSpan="5" className="text-center">{returnError.message}</td></tr>;
  }

  return markup;
};