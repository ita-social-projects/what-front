import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addOne, subtractOne } from './redux/test-actions';
import { counterSelector } from './redux/test-selectors';

export const TestComponent = () => {
  const counter = useSelector(counterSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Test counter: {counter}</h2>
      <button onClick={() => dispatch(addOne())}>Add</button>
      <button onClick={() => dispatch(subtractOne())}>Subtract</button>
    </div>
  );
};
