import React from 'react';
import { Blocks } from '@components/blocks';
import { Rows } from '@components/rows';

const getErrorMessage = (errors) => {
  const returnError = { isError: false, message: '' };

  errors.forEach((error) => {
    if (error.check.includes(true)) {
      returnError.isError = true;
      returnError.message = error.message;
    }
  });

  if (returnError.isError) {
    return (
      <tr>
        <td colSpan="5" className="text-center">
          {returnError.message}
        </td>
      </tr>
    );
  }
  return null;
};

/**
 * @param listType may be 'list' or 'block'
 * @param props is an object:
 * {
    data: Array<Object{id?, index?, firstName?, lastName?, email?, name?}>,
    handleDetails?: function,
    handleEdit?: function,
    errors: Array<Object{message, check: [boolean, ...]}>,
    access: boolean,
    fieldsToShow: Array<string>,
    children?: custom field
  }
 * @param custom: custom field
 * @returns jsx in rows (listType === 'list') or in blocks/cards (listType === 'block') or error message
 *
 * errors contains objects with check array (boolean values) and message field when at least one error is true
 * editRestriction contains boolean if user has role with limitation for editing, it is false by default
 */

export const List = ({ listType, props, children: custom }) => {
  const errorsMessage = getErrorMessage(props.errors);

  return (
    errorsMessage ||
    (listType === 'list' ? Rows(props, custom) : Blocks(props, custom))
  );
};
